const initialState = {
  loading: false,
  politician: {},
  politicians: [],
  searchResults: [],
  liked: [],
  all: [],
  error: ''
};


const politicians = (state = initialState, action) => {
  switch(action.type) {
    case 'START_FETCH_POLITICIAN':
      return { ...state, loading: true };
    case 'SUCCESS_FETCH_POLITICIAN':
      return { ...state, loading: false, politician: action.politician, error: '' };
    case 'SUCCESS_FETCH_POLITICIANS':
      return { ...state, loading: false, politicians: action.politicians, error: '' };
    case 'SUCCESS_FETCH_SEARCH_RESULTS_POLITICIANS':
      return { ...state, loading: false, searchResults: action.politicians, error: '' };
    case 'SUCCESS_FETCH_LIKED_POLITICIANS':
      return { ...state, loading: false, liked: action.politicians, error: '' };
    case 'SUCCESS_FETCH_ALL_POLITICIANS':
      return { ...state, loading: false, all: action.politicians, error: '' };
    case 'UPDATE_POLITICIAN':
      const { politicians, searchResults, liked, all } = state;

      if (state.politician._id === action.politician._id) {
        state.politician = action.politician;
      }

      const replacePolitician = politician => {
        if (politician._id === action.politician._id) {
          return action.politician;
        } else {
          return politician;
        }
      };

      return {
        ...state,
        loading: false,
        politicians: politicians.map(replacePolitician),
        searchResults: searchResults.map(replacePolitician),
        liked: liked.map(replacePolitician),
        all: all.map(replacePolitician),
        error: ''
      };
    case 'ERROR_FETCH_POLITICIAN':
      return { ...state, loading: false, error: action.err };
    default:
      return state; 
  };
};

export default politicians;
