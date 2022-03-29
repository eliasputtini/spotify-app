export const DETAILS = 'DETAILS';
export const GET_DETAILS = 'GET_DETAILS';
export const LOAD_MORE = 'LOAD_MORE';
export const RESULTS = 'RESULTS';
export const SEARCH = 'SEARCH';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const details = details => ({type: DETAILS, details});
export const getDetails = url => ({type: GET_DETAILS, url});
export const loadMore = url => ({type: LOAD_MORE, url});
export const results = (results, clearPrevious = false) => ({
  type: RESULTS,
  results,
  clearPrevious,
});
export const search = query => ({type: SEARCH, query});
export const toggleFilter = (category, selected) => ({
  type: TOGGLE_FILTER,
  category,
  selected,
});
