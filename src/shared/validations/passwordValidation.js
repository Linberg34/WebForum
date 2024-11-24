export function validatePassword(password) {
    if (password.length < 6) {
        return 'Пароль должен быть длиной не менее 6 символов.';
    }
    return null;
}
