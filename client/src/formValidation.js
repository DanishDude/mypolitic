export function required(value) {
  return value ? undefined : 'Obligatoire';
}

export function maxLength(max) {
  return value => value && value.length > max ? `Maximum ${max} caractères` : undefined;
}
