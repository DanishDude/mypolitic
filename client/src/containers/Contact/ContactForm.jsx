import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { required, maxLength } from '../../formValidation';
import { sendInfoMessage } from '../../actions/message';
import { text, textArea } from '../../components/forms/input';
import './ContactForm.scss';

let ContactForm = (props) => {
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
        props.initialize(initialValues);
    }, [user, politicianProfile]);

    const handleSubmit = (e) => {
        dispatch(sendInfoMessage(form.contact.values, token));
        e.preventDefault();
    };

    return (
        <div className="ContactForm">
            <form onSubmit={handleSubmit}>
                <Field name="name" component={text} type="text" label="Nom" />
                <Field name="senderEmail" component={text} type="email" label="Email" />
                <Field name="subject" component={text} type="text" label="Sujet" />
                <Field name="body" component={textArea} type="textarea" label="Message" />
                <Field name="source" component="input" type="hidden" />
                <Button color="primary" type="submit">
                    Envoyer
                </Button>
            </form>
        </div>
    );
};

ContactForm = reduxForm({
    form: 'contact',
    enableReinitialize: true,
})(ContactForm);

export default ContactForm;
