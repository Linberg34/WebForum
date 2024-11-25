export async function sendRegistrationRequest(formData) {
    try {
        const response = await fetch('http://localhost/registration/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Ошибка при регистрации.');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Не удалось завершить регистрацию.');
    }
}
