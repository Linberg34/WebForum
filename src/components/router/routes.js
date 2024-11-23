export const routes = {
    '/login': {
        page: '../forms/authForm/index.html',
        navItems: [
            { text: 'На главную', href: '/' },
            { text: 'Вход', href: '/login' }
        ]
    }
};

export function getRouteConfig(path) {
    return routes[path] || routes['/'];
}