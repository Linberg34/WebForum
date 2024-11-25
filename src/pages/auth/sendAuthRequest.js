export async function sendAuthRequest(email, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        if(response.status === 401){
            throw new Error('Неверные учетные данные');
        } else if (response.status >= 500){
            throw new Error('Внутренняя ошибка сервера');
        }else {
            throw new Error('Произошла ошибка');
        }
    }
    return await response.json();
    
}