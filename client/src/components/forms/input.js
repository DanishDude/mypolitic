import React from 'react';
import { TextField } from '@material-ui/core';

export const text = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div className="field">
            <TextField {...input} id="standard-required" label={label} type={type} fullWidth variant="outlined" />
            <div className="error-line">
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};

export const textArea = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div className="field">
            <TextField
                {...input}
                id="standard-required"
                label={label}
                multiline
                rows={4}
                rowsMax={8}
                fullWidth
                variant="outlined"
            />
            <div className="error-line">
                {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};
