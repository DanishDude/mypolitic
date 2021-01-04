import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { email, required } from '../../components/forms/formValidation';
import { clearMessageData, sendInfoMessage } from '../../actions/message';
import { renderText } from '../../components/forms/Input';
import './ContactForm.scss';

const ContactForm = (props) => {
    const { initialize, invalid, pristine, submitting } = props;
    const { user, token } = useSelector((state) => state.user);
    const { politicianProfile } = useSelector((state) => state.politicianProfile);
    const { error, loading, msg } = useSelector((state) => state.message);
    const { form } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const initialValues = {
            name:
                Object.keys(politicianProfile).length !== 0
                    ? politicianProfile.firstname + ' ' + politicianProfile.lastname
                    : '',
            senderEmail: user ? user.email : '',
            source: 'MyPolitic Contact Form',
        };
        initialize(initialValues);

        if (error) {
            toast.warn("erreur d'envoi du message", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 15000,
                pauseOnFocusLoss: true,
            });
        }
        if (msg === 'Email sent') {
            toast.info('Message envoyé', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 10000,
                pauseOnFocusLoss: true,
            });
        }

        return () => dispatch(clearMessageData());
    }, [dispatch, error, initialize, msg, user, politicianProfile]);

    const handleSubmit = (e) => {
        dispatch(sendInfoMessage(form.contact.values, token));
        e.preventDefault();
    };

    return (
        <div className="ContactForm">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <Field
                        name="name"
                        component={renderText}
                        fullWidth={true}
                        type="text"
                        label="Nom"
                        variant="outlined"
                    />
                </div>
                <div className="field">
                    <Field
                        name="senderEmail"
                        component={renderText}
                        fullWidth={true}
                        type="email"
                        label="Email"
                        validate={[required, email]}
                        variant="outlined"
                    />
                </div>
                <div className="field">
                    <Field
                        name="subject"
                        component={renderText}
                        fullWidth={true}
                        type="text"
                        label="Sujet"
                        variant="outlined"
                    />
                </div>
                <div className="field">
                    <Field
                        name="body"
                        component={renderText}
                        fullWidth={true}
                        multiline={true}
                        rows={4}
                        rowsMax={8}
                        type="textarea"
                        label="Message"
                        validate={required}
                        variant="outlined"
                    />
                </div>
                <Field name="source" component="input" type="hidden" />
                <div className="field">
                    <Button
                        color="primary"
                        type="submit"
                        variant="outlined"
                        fullWidth
                        disabled={invalid || pristine || submitting}
                    >
                        {loading ? <CircularProgress size="1rem" /> : 'Envoyer'}
                    </Button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'contact',
})(ContactForm);
