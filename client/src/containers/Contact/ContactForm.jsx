import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { email, required } from '../../components/forms/formValidation';
import { sendInfoMessage } from '../../actions/message';
import { renderText } from '../../components/forms/Input';
import './ContactForm.scss';

const ContactForm = (props) => {
    const { initialize, invalid, pristine, submitting } = props;
    const { user, token } = useSelector((state) => state.user);
    const { politicianProfile } = useSelector((state) => state.politicianProfile);
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
    }, [initialize, user, politicianProfile]);

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
                        autoFocus={true}
                        fullWidth={true}
                        type="text"
                        label="Nom"
                        validate={required}
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
                        validate={required}
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
                <Button color="primary" type="submit" disabled={invalid || pristine || submitting}>
                    Envoyer
                </Button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'contact',
})(ContactForm);
