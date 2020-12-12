import React from 'react';
import { TextField } from '@material-ui/core';

export const renderText = ({
    input,
    label,
    autoFocus = false,
    defaultValue = '',
    fullWidth = false,
    multiline = false,
    rows = '',
    rowsMax = '',
    type,
    variant = 'standard',
    meta: { error, invalid, touched },
}) => {
    return (
        <TextField
            {...input}
            id={label}
            label={label}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            type={type}
            multiline={multiline}
            rows={rows}
            rowsMax={rowsMax}
            fullWidth={fullWidth}
            variant={variant}
            error={touched && invalid}
            helperText={touched && error}
        />
    );
};
