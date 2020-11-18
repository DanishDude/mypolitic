const initialState = {
  loading: false,
  politicianProfile: {},
  error: ''
};

const politicianProfile = (state=initialState, action) => {
  switch (action.type) {
    case 'START_UPDATE_POLITICIAN_PROFILE':
      return {...state, loading: true, error: ''};
    case 'SUCCESS_UPDATE_POLITICIAN_PROFILE':
      return {...state, loading: false, error: ''};
    case 'ERROR_UPDATE_POLITICIAN_PROFILE':
      return {...state, loading: false, error: action.err};
    case 'START_GET_POLITICIAN_PROFILE':
      return {...state, loading: true, error: ''};
    case 'SUCCESS_GET_MY_POLITICIAN_PROFILE':
      return {...state, loading: false, politicianProfile: action.politicianProfile, error: ''};
    case 'ERROR_GET_POLITICIAN_PROFILE':
      return {...state, loading: false, error: action.err};
    case 'START_UPDATE_UNREGISTERED_TEAM':
      return {...state, loading: true, error: ''};
    case 'SUCCESS_UPDATE_UNREGISTERED_TEAM':
      return {...state, loading: false, error: ''};
    case 'ERROR_UPDATE_UNREGISTERED_TEAM':
      return {...state, loading: false, error: action.err};
    case 'DELETE_PROFILE_DATA':
      return initialState;
    default:
      return state;
  };
};

export default politicianProfile;
