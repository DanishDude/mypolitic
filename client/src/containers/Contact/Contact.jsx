import React from 'react';
import { Paper } from '@material-ui/core';
import ContactForm from './ContactForm';
import './Contact.scss';

const Contact = () => {
    return (
        <div className="Contact">
            <h1>Help Page</h1>
            <div className="content">
                <Paper className="paper" elevation={3}>
                    <ContactForm />
                </Paper>
            </div>
        </div>
    );
};

export default Contact;
