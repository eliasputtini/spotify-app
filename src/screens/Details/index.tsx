import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as Actions from '../../actions';

import {Tags} from '../components/Tags';
import {TrackList} from '../components/TrackList';
import {SpotifyButton} from '../components/SpotifyButton';
import {Player} from '../components/Player';

import {
  Image,
  ImageContainer,
  Container,
  Header,
  HeaderContent,
  Title,
  ScrollView,
  Section,
  SectionHeader,
} from './styles';

export const Details = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {id, href} = route.params;

  const details = useSelector(state => state.details[id]); // Check cache

  useEffect(() => {
    if (!details) {
      dispatch(Actions.getDetails(href)); // If not cached, fetch
    } else {
      navigation.setOptions({title: details.name}); // Update route title
    }
  }, [details]);

  const {
    album,
    albums,
    artists,
    external_urls,
    genres,
    name,
    preview_url,
    relatedArtists,
    topTracks,
    tracks,
    type,
    uri,
    release_date,
  } = details || {};

  // Select an image by height if available or any image with a url
  const minHeight = 120;
  const images = details?.images || album?.images;
  const image =
    images?.length &&
    (images.some(image => image.height) // Not all images have a height prop
      ? images
          .sort((image1, image2) => image1.height - image2.height)
          .find(image => image.height >= minHeight) // Get smallest acceptable height
      : images.find(image => image.url)); // If no height is available pick any image with a url

  const relatedAlbums = [
    ...(albums?.items || []), // Albums by an artist
    ...(album ? [album] : []), // Album a track appears on
  ];

  return (
    <Container>
      <Header>
        <ImageContainer>
          <Image
            source={{uri: image?.url}}
            resizeMethod="scale"
            resizeMode="cover"
          />
          {preview_url && (
            <Player
              url={preview_url}
              title={name}
              artists={artists}
              artwork={image?.url}
            />
          )}
        </ImageContainer>
        <HeaderContent>
          <Title numberOfLines={2} ellipsizeMode="tail">
            {name}
          </Title>
          <SectionHeader>
            {type} {release_date ? ' - ' + release_date?.split('-', 1) : ''}
          </SectionHeader>
          {(uri || external_urls?.spotify) && (
            <Section>
              <SpotifyButton uri={uri} url={external_urls?.spotify} />
            </Section>
          )}
        </HeaderContent>
      </Header>
      <ScrollView>
        {artists?.length && (
          <Section>
            <SectionHeader>{'Artists'}</SectionHeader>
            <Tags items={artists} />
          </Section>
        )}
        {genres?.length > 0 && (
          <Section>
            <SectionHeader>{'Genres'}</SectionHeader>
            <Tags type="genre" items={genres} />
          </Section>
        )}
        {tracks?.items.length > 0 && (
          <Section>
            <SectionHeader>{'Tracks'}</SectionHeader>
            <TrackList items={tracks.items} />
          </Section>
        )}
        {topTracks?.tracks.length > 0 && (
          <Section>
            <SectionHeader>{'Top tracks'}</SectionHeader>
            <TrackList items={topTracks.tracks} />
          </Section>
        )}
        {relatedAlbums.length > 0 && (
          <Section>
            <SectionHeader>{'Albums'}</SectionHeader>
            <Tags items={relatedAlbums} />
          </Section>
        )}
        {relatedArtists?.artists.length > 0 && (
          <Section>
            <SectionHeader>{'Related artists'}</SectionHeader>
            <Tags items={relatedArtists.artists} />
          </Section>
        )}
      </ScrollView>
    </Container>
  );
};
