import politicians from './politicians';

const initialState = {
    loading: false,
    isLoggedIn: false,
    requestLogin: false,
    user: {},
    token: '',
    error: '',
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCH_SIGNUP_LOGIN':
            return { ...state, loading: true, isLoggedIn: false, error: '', requestLogin: false };
        case 'SUCCESS_FETCH_SIGNUP_LOGIN':
            return {
                ...state,
                loading: false,
                requestLogin: false,
                isLoggedIn: true,
                user: action.user,
                token: action.token,
            };
        case 'ERROR_FETCH_SIGNUP_LOGIN':
            return { ...state, loading: false, isLoggedIn: false, requestLogin: false, error: action.err };
        case 'LOGOUT':
            return initialState;
        case 'REQUEST_LOGIN':
            return { ...state, requestLogin: true };
        case 'DENY_LOGIN_REQUEST':
            return { ...state, requestLogin: false };
        case 'LIKE_POLITICIAN':
            if (!state.user.likes.includes(action.politicianId)) {
                state.user.likes.push(action.politicianId);
            }
            return { ...state };
        case 'DISLIKE_POLITICIAN':
            state.user.likes = state.user.likes.filter((like) => like !== action.politicianId);
            return { ...state };
        case 'FOLLOW_POLITICIAN':
            if (!state.user.follows.includes(action.politicianId)) {
                state.user.follows.push(action.politicianId);
            }
            return { ...state };
        case 'UNFOLLOW_POLITICIAN':
            state.user.follows = state.user.follows.filter((like) => like !== action.politicianId);
            return { ...state };
        default:
            return state;
    }
};

export default user;
