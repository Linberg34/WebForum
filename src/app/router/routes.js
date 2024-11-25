const parcerRoot = "./__parcel_source_root";

function createPath(path) { return `${parcerRoot}/${path}` };

export const routes = {
    '/login': { page: createPath(`src/pages/auth/index.html`)},
    '/registration': { page: createPath('src/pages/registration/index.html')}
};


export function getRouteConfig(path) {
    return routes[path] || routes['/'];
}