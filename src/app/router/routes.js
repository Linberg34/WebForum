import { initAuth } from "../../pages/auth/authInit";
import { initCommunitiesPage } from "../../pages/communities/communitiesPage";
import { initMainPage } from "../../pages/main/mainPage";
import { initProfilePage } from "../../pages/profile/profile";
import { initDetailedPost } from "../../pages/detailedPost/detailedPost";
import { initRegistration } from "../../pages/registration/regInit";
import { initAuthorsPage } from "../../pages/authors/authorPage.js";
import { matchRoute } from "./router.js";

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
    },
    '/authors':{
        fn:(container) => initAuthorsPage(container),
        sourcePath:"/src/pages/authors/index.html"
    },
    'community/:id':{
        fn:(container,params) => initCommunityPage(container,params.id),
        sourcePath:"/src/pages/communities/concreteCommunity/index.html"
    },
    'post/:id': {
    fn: (container, params) =>  initDetailedPost(container, params.id),
    sourcePath: "/src/pages/detailedPost/index.html",
}

};

export function getRouteConfig(path) {
    for (const [routePath, route] of Object.entries(routes)) {
        const params = matchRoute(routePath, path);
        if (params) {
            return { ...route, params };
        }
    }
    return routes['/'] || null;
}