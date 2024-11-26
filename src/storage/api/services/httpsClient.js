const API_BASE_URL = "https://blog.kreosoft.space/api";

export async function httpClient(endpoint, { method = "GET", body, headers = {} } = {}) {
    const token = sessionStorage.getItem("authToken");
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers
        },
        ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Ошибка сети");
    }
    return response.json();
}
