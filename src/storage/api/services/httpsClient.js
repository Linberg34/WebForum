const API_BASE_URL = "https://blog.kreosoft.space/api";

export async function httpClient(endpoint, { method = "GET", body, headers = {} } = {}) {
    const token = sessionStorage.getItem("authToken");
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        let errorDetails;
        try {
            errorDetails = await response.json(); // Попытка парсинга тела ошибки
        } catch {
            errorDetails = { message: `Ошибка: ${response.statusText}` };
        }
        console.error("Ошибка от сервера:", errorDetails);
        throw new Error(errorDetails.message || "Неизвестная ошибка");
    }

    // Обработка пустого тела ответа (например, для 204 No Content)
    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return null;
    }

    try {
        return await response.json(); // Попытка вернуть JSON
    } catch {
        return null; // Если тело ответа пустое или не JSON, возвращаем null
    }
}
