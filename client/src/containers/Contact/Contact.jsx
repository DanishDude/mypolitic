import React from 'react';
import { Paper } from '@material-ui/core';
import ContactForm from './ContactForm';
import './Contact.scss';

const Contact = () => {
    return (
        <div className="Contact">
            <h1>Écrivez-nous</h1>
            <div className="subtitle">
                <h4>Voulez-vous donner un commentaire?</h4>
                <h4>Ou contactez l'équipe My Politic?</h4>
            </div>
            <div className="content">
                <Paper className="paper" elevation={3}>
                    <ContactForm />
                </Paper>
            </div>
        </div>
    );
};

export default Contact;
