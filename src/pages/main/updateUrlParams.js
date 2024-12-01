import { getRouteConfig } from "../../app/router/routes";

export function updateURLParams(page, pageSize, filters = {}) {
    const params = new URLSearchParams();

    params.set("page", page);
    params.set("size", pageSize); 

    for (const [key, value] of Object.entries(filters)) {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                params.delete(key);
                value.forEach((val) => {
                    params.append(key, val);
                });
            } else {
                params.delete(key);
            }
        } else if (value !== undefined && value !== null && value !== '') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
    }

    const currentPath = window.location.pathname;
    const routeConfig = getRouteConfig(currentPath);

    if (routeConfig) {
        window.history.pushState({}, "", `${currentPath}?${params.toString()}`);
    }
}

