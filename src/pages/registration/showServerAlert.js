export function showServerErrorAlert(errorResponse) {
    if (!errorResponse || typeof errorResponse !== 'object') {
        alert('Неизвестная ошибка. Пожалуйста, попробуйте снова.');
        return;
    }

    const { title, errors } = errorResponse;

    const messages = [title || 'Произошла ошибка.'];

    if (errors && typeof errors === 'object') {
        for (const field in errors) {
            if (Array.isArray(errors[field])) {
                errors[field].forEach(msg => {
                    messages.push(`${field}: ${msg}`);
                });
            }
        }
    } else {
        messages.push('Дополнительной информации об ошибке нет.');
    }

    alert(messages.join('\n'));
}
