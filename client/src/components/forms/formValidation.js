export function email(email) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return regex.test(String(email).toLowerCase()) ? undefined : 'Adresse e-mail invalide';
}

function maxLength(max, value) {
    return value && value.length > max ? `Maximum ${max} caractères` : undefined;
}

export function maxLength22(value) {
    return maxLength(22, value);
}

export function maxLength800(value) {
    return maxLength(800, value);
}

export function maxLength2000(value) {
    return maxLength(2000, value);
}

export function required(value) {
    return value ? undefined : 'Obligatoire';
}
