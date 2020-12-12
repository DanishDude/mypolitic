import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { email, required, maxLength } from '../../components/forms/formValidation';
import { sendInfoMessage } from '../../actions/message';
import { renderText, textArea } from '../../components/forms/Input';
import './ContactForm.scss';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['body', 'name', 'senderEmail', 'subject'];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Obligatiore';
        }
    });
    if (values.senderEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.senderEmail)) {
        errors.senderEmail = 'Adresse e-mail invalide';
    }

    return errors;
};

const ContactForm = (props) => {
    const { initialize, isInvalid, pristine, submitting } = props;
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
                <Field name="name" component={renderText} type="text" label="Nom" /* validate={required} */ />
                <Field name="senderEmail" component={renderText} type="email" label="Email" /* validate={email} */ />
                <Field name="subject" component={renderText} type="text" label="Sujet" /* validate={required} */ />
                <Field name="body" component={textArea} type="textarea" label="Message" /*  validate={required} */ />
                <Field name="source" component="input" type="hidden" />
                <Button color="primary" type="submit">
                    Envoyer
                </Button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'contact',
    validate,
    // enableReinitialize: true,
    // destroyOnUnmount: false,
})(ContactForm);

// export default ContactForm;
