const initialState = {
  loading: false,
  politician: {},
  politicians: [],
  error: ''
};

const politicians = (state = initialState, action) => {
  switch(action.type) {
    case 'START_FETCH_POLITICIAN':
      return { ...state, loading: true };
    case 'SUCCESS_FETCH_POLITICIAN':
      return { ...state, loading: false, politician: action.politician };
    case 'ERROR_FETCH_POLITICIAN':
      return { ...state, loading: false, error: action.err };
    default:
      return state;
  };
};

export default politicians;
