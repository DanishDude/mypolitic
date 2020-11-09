const initialState = {
  loading: false,
  user: {},
  token: '',
  error: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH_SIGNUP_LOGIN':
      return { ...state, loading: true, error: '' };
    case 'SUCCESS_FETCH_SIGNUP_LOGIN':
      return { ...state, loading: false, user: action.user, token: action.token};
    case 'ERROR_FETCH_SIGNUP_LOGIN':
      return { ...state, loading: false, error: action.err };
    case 'DELETE_USER_DATA':
      return initialState;
    case 'LOGIN_REQUIRED':
      return { ...state, error: 'login required' }
    default:
      return state;
  };
};

export default user;
