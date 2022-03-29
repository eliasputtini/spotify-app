import {
  DETAILS,
  ERROR,
  GET_DETAILS,
  RESULTS,
  SEARCH,
  TOGGLE_FILTER,
} from '../actions';

export const filters = [
  {category: 'albums', type: 'album', selected: true},
  {category: 'artists', type: 'artist', selected: false},
  {category: 'playlists', type: 'playlist', selected: false},
  {category: 'tracks', type: 'track', selected: false},
];

const initialState = {
  query: null,
  results: {},
  details: {},
  error: null,
  filters: filters,
};

const updateResults = (results, newResults, clearPrevious) => {
  results = clearPrevious ? {} : results;
  for (const key in newResults) {
    results[key] = {
      ...newResults[key],
      items: [...(results[key]?.items || []), ...newResults[key].items],
    };
  }
  return {...results}; // Return a new object to trigger re-render
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        error: null,
        query: action.query,
      };
    case RESULTS:
      return {
        ...state,
        details: {}, // Clear cached details
        results: updateResults(
          state.results,
          action.results,
          action.clearPrevious,
        ),
      };
    case GET_DETAILS:
      return {
        ...state,
        error: null,
      };
    case DETAILS:
      return {
        ...state,
        details: {...state.details, [action.details.id]: action.details},
      };
    case TOGGLE_FILTER:
      return {
        ...state,
        filters: state.filters.map(filter => {
          return filter.category === action.category && filter.selected === true
            ? {...filter, selected: false}
            : filter.category !== action.category
            ? {...filter, selected: false}
            : {...filter, selected: action.selected};
        }),
      };
    default:
      return state;
  }
};
