const parcerRoot = "./__parcel_source_root";

function createPath(path) { return `${parcerRoot}/${path}` };

export const routes = {
    '/login': { page: createPath(`src/pages/auth/index.html`)},
    '/': { page: createPath('src/pages/home.html') } ,
    '/registartion': { page: createPath('src/pages/registartion/index.html') }
};


export function getRouteConfig(path) {
    return routes[path] || routes['/'];
}