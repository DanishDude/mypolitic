const initialState = {
  loading: false,
  politicianProfile: {},
  teamInfo: [],
  error: '',
  loadingTeam: false
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
    case 'START_FETCH_TEAM_DETAILS':
      return { ...state, loadingTeam: true, error: '' };
    case 'SUCCESS_FETCH_TEAM_DETAILS':
      return { ...state, loadingTeam: false, teamInfo: [...action.team] };
    case 'ERROR_GET_POLITICIAN_PROFILE':
      return {...state, loading: false, error: action.err};
    case 'DELETE_PROFILE_DATA':
      return initialState;
    default:
      return state;
  };
};

export default politicianProfile;
