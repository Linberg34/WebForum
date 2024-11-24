export function validateFullName(fullName) {
    if (fullName.length < 1 || fullName.length > 1000) {
        return 'ФИО должно быть длиной от 1 до 1000 символов.';
    }
    return null;
}
