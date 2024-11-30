import { initAuth } from "../../pages/auth/authInit";
import { initCommunitiesPage } from "../../pages/communities/communitiesPage";
import { initMainPage } from "../../pages/main/mainPage";
import { initProfilePage } from "../../pages/profile/profile";
import { initRegistration } from "../../pages/registration/regInit";

export const parcerRoot = "./__parcel_source_root";

function createPath(path) { return `${parcerRoot}/${path}` };


const routes = {
    '/': { 
        fn: (container) => initMainPage(container), 
        sourcePath: "/src/pages/main/index.html"
    },
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
    },
    '/communities':{
        fn:(container) => initCommunitiesPage(container),
        sourcePath:"/src/pages/communities/index.html"
    }
};

export function getRouteConfig(path) {
    return routes[path] || routes['/'];
}