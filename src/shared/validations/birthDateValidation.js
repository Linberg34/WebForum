export function validateBirthDate(birthDate) {
    if (!birthDate) return null; 

    const date = new Date(birthDate);

    if (isNaN(date.getTime())) {
        return 'Введите корректную дату.';
    }

    const today = new Date();
    if (date > today) {
        return 'Дата рождения не может быть в будущем.';
    }

    return null;
}
