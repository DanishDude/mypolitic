const initialState = {
    loading: false,
    politician: { teamInfo: [] },
    politicians: [],
    liked: [],
    follow: [],
    all: [],
    searchResults: [],
    error: '',
};

const politicians = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCH_POLITICIAN':
            return { ...state, loading: true };
        case 'SUCCESS_FETCH_POLITICIAN':
            return { ...state, loading: false, politician: { ...action.politician, teamInfo: [] }, error: '' };
        case 'SUCCESS_FETCH_TEAM_INFO':
            state.politician.teamInfo = action.teamInfo;
            return { ...state, loading: false, error: '' };
        case 'START_FETCH_POLITICIANS':
            return { ...state, loading: true, searchResults: [] };
        case 'SUCCESS_FETCH_POLITICIANS':
            return { ...state, loading: false, politicians: action.politicians, error: '' };
        case 'SUCCESS_FETCH_SEARCH_RESULTS_POLITICIANS':
            return { ...state, loading: false, searchResults: action.politicians, error: '' };
        case 'SUCCESS_FETCH_LIKED_POLITICIANS':
            return { ...state, loading: false, liked: action.politicians, error: '' };
        case 'SUCCESS_FETCH_FOLLOWED_POLITICIANS':
            return { ...state, loading: false, follow: action.politicians, error: '' };
        case 'SUCCESS_FETCH_ALL_POLITICIANS':
            return { ...state, loading: false, all: action.politicians, error: '' };
        case 'UPDATE_POLITICIAN':
            const { all, follow, liked, politicians, searchResults } = state;

            if (state.politician._id === action.politician._id) {
                state.politician = action.politician;
            }

            const updatePolitician = (politician) => {
                if (politician._id === action.politician._id) {
                    return action.politician;
                } else {
                    return politician;
                }
            };

            return {
                ...state,
                loading: false,
                politician: action.politician,
                politicians: politicians.map(updatePolitician),
                searchResults: searchResults.map(updatePolitician),
                liked: liked.map(updatePolitician),
                follow: follow.map(updatePolitician),
                all: all.map(updatePolitician),
                error: '',
            };
        case 'CLEAR_POLITICIAN_SEARCH_RESULTS':
            return { ...state, searchResults: [] };
        case 'ERROR_FETCH_POLITICIAN':
            return { ...state, loading: false, error: action.err };
        default:
            return state;
    }
};

export default politicians;
