import base64 from 'react-native-base64';

const GET = 'GET',
  POST = 'POST';
const BASE_URL = 'https://api.spotify.com/v1';
const BASE_URL_TOKEN = 'https://accounts.spotify.com/api/token';

const SPOTIFY_ID = 'e77b9e3801f64f05a87d39ec7de908f5';
const SPOTIFY_SECRET = '785d1a13092245f9a0428b3da8b6164b';

const asyncRequest = (
  method,
  token,
  baseUrl = BASE_URL,
  path = '',
  params = {},
) => {
  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(value),
    )
    .join('&');

  const url = `${baseUrl}${path}${method === GET && query ? '?' + query : ''}`;

  const requestParams = {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...(method === POST && query && {body: query}),
  };

  return new Promise((resolve, reject) => {
    fetch(url, requestParams)
      .then(response => response.json())
      .then(data => (data.error ? reject(data.error) : resolve(data)))
      .catch(error => reject(error.message));
  });
};

export const getToken = async () => {
  const basicToken = `Basic ${base64.encode(
    SPOTIFY_ID + ':' + SPOTIFY_SECRET,
  )}`;
  const params = {grant_type: 'client_credentials'};
  const token = await asyncRequest(
    POST,
    basicToken,
    BASE_URL_TOKEN,
    undefined,
    params,
  );
  return {
    bearer: `Bearer ${token.access_token}`,
    expiresIn: token.expires_in * 1000, // Convert seconds to milliseconds
    creationDate: Date.now(),
  };
};

export const search = async (token, query, type, offset = 0, limit = 20) => {
  const path = '/search';
  if (!query) {
    throw Error('No query provided!'); // Query is required
  } else if (!type) {
    throw Error('No filters selected!'); // Type is required
  } else {
    const params = {q: query, type, offset, limit};
    return asyncRequest(GET, token, undefined, path, params);
  }
};

export const loadMore = async (token, url) => {
  return asyncRequest(GET, token, url);
};

export const getDetails = async (token, url) => {
  let details = await asyncRequest(GET, token, url);
  const {type, id} = details;
  if (type === 'artist') {
    const albums = await asyncRequest(
      GET,
      token,
      undefined,
      `/artists/${id}/albums`,
      {limit: 10},
    ); // Get artist's albums
    const topTracks = await asyncRequest(
      GET,
      token,
      undefined,
      `/artists/${id}/top-tracks`,
      {market: 'US'},
    ); // Get artist's top tracks
    const relatedArtists = await asyncRequest(
      GET,
      token,
      undefined,
      `/artists/${id}/related-artists`,
    ); // Get artist's related artists
    details = {...details, albums, topTracks, relatedArtists};
  }
  return details;
};
