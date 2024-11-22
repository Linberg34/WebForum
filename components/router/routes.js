export const routes = {
    '/': {
        page: '../public/index.html',
        header: '../components/common/header/index.html', 
    }
};

export function getRouteConfig(path) {
    return routes[path] || routes['/']; 
}
