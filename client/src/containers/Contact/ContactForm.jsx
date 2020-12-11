import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { required, maxLength } from '../../formValidation';
import './ContactForm.scss';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div className="field">
            {type === 'textarea' ? (
                <TextField
                    {...input}
                    id="standard-required"
                    label={label}
                    multiline
                    rowsMax={8}
                    fullWidth
                    variant="outlined"
                />
            ) : (
                <TextField {...input} id="standard-required" label={label} type={type} fullWidth variant="outlined" />
            )}
            <div className="error-line">
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};

let ContactForm = (props) => {
    const { user, token } = useDispatch((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log(e);
    };

    return (
        <div className="ContactForm">
            <form onSubmit={handleSubmit}>
                <Field name="name" component={renderField} type="text" label="Nom" />
                <Field name="senderEmail" component={renderField} type="email" label="Email" />
                <Field name="subject" component={renderField} type="text" label="Sujet" />
                <Field name="body" component={renderField} type="textarea" label="Message" />
                <Field name="source" component="input" type="hidden" value="Cleint Web" />
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
