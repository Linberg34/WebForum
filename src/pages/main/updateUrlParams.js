import { getRouteConfig } from "../../app/router/routes";

export function updateURLParams(page, pageSize, filters = {}) {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page);
    params.set("pageSize", pageSize);

    for (const [key, value] of Object.entries(filters)) {
        if (value) {
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
