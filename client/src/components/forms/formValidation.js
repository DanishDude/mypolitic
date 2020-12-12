export function required(value) {
    return value ? undefined : 'Obligatoire';
}

export function requiredFields([...fields]) {
    /* fields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    }); */
}

export function maxLength(max) {
    return (value) => (value && value.length > max ? `Maximum ${max} caractères` : undefined);
}

export function email(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase()) ? 'Email invalide' : undefined;
}
