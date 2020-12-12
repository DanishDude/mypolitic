import { urlApi } from '../constant';

export const startSendingMessage = () => ({
    type: 'START_SENDING_MESSAGE',
});

export const successSendingMessage = (msg) => ({
    type: 'SUCCESS_SENDING_MESSAGE',
    msg,
});

export const errorSendingMessage = (err) => ({
    type: 'ERROR_SENDING_MESSAGE',
    err,
});

export const sendInfoMessage = (data, token = '') => (dispatch) => {
    dispatch(startSendingMessage());

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify(data),
    };

    fetch(`${urlApi}/message/info`, options)
        .then((res) => res.json())
        .then((payload) => {
            const { success, msg } = payload;

            if (!success) {
                dispatch(errorSendingMessage(msg));
            } else {
                dispatch(successSendingMessage(msg));
            }
        })
        .catch((error) => dispatch(errorSendingMessage(error)));
};
