import { initAuth } from "../../pages/auth/authInit";
import { initProfilePage } from "../../pages/profile/profile";
import { initRegistration } from "../../pages/registration/regInit";

export const parcerRoot = "./__parcel_source_root";

function createPath(path) { return `${parcerRoot}/${path}` };


const routes = {
    '/login': { 
        fn: (container) => initAuth(container), 
        sourcePath: "/src/pages/auth/index.html"
    },
    '/registration':{
        fn: (container) => initRegistration(container), 
        sourcePath: "/src/pages/registration/index.html"
    }
    ,
    '/profile':{
        fn:(container) => initProfilePage(container),
        sourcePath:"/src/pages/profile/index.html"
    }
};

export function getRouteConfig(path) {
    return routes[path] || routes['/'];
}