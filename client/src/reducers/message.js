const initialState = {
    loading: false,
    msg: '',
    error: '',
};

const message = (state = initialState, action) => {
    switch (action.type) {
        case 'START_SENDING_MESSAGE':
            return { ...state, loading: true, error: '' };
        case 'SUCCESS_SENDING_MESSAGE':
            return { ...state, loading: false, msg: action.msg, error: '' };
        case 'ERROR_SENDING_MESSAGE':
            return { ...state, loading: false, error: action.err };
        default:
            return state;
    }
};

export default message;
