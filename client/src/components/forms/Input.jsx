import React from 'react';
import { TextField } from '@material-ui/core';

export const renderText = ({ input, label, type, meta: { error, invalid, touched } }) => {
    return (
        <div className="field">
            <TextField
                {...input}
                id={label}
                label={label}
                type={type}
                fullWidth
                variant="outlined"
                error={touched && invalid}
                helperText={touched && error}
            />
        </div>
    );
};

export const textArea = ({ input, label, type, meta: { error, invalid, touched, warning } }) => {
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
                error={touched && invalid}
                helperText={touched && error}
            />
        </div>
    );
};
