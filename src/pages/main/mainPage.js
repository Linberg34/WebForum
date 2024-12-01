import { initDropDown } from "../profile/dropDown";
import { fetchAndRenderPosts } from "./fetchAndRenderPosts";
import { loadTags } from "./loadTags";
import { preventIncorrectInput } from "./preventIncorrectInput";
import { updateURLParams } from "./updateUrlParams";
import { getFilters } from "./getFilterQuery.js";
import { insertEmailToDropDown } from "./insertEmailToDropDown.js";
import {getRouteConfig} from '../../app/router/routes.js';
import { showCreatePostButton } from "./showCreatePostButton.js";

let isInitialLoad = true; 

//TODO5. Пофиксить комменты
//TODO6. Разбить логику CSS на файлы



export async function initMainPage() {
    if (!isInitialLoad) return;
    isInitialLoad = false;  

    showCreatePostButton();
    preventIncorrectInput();
    await insertEmailToDropDown();
    await initDropDown();
    await loadTags();

    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page")) || 1;
    const pageSize = Number(params.get("size")) || 5;

    

    await fetchAndRenderPosts(page, pageSize);

    window.addEventListener("popstate", () => {
        const path = window.location.pathname;
        const routeConfig = getRouteConfig(path);
    
        const container = document.getElementById("app"); 
        const params = new URLSearchParams(window.location.search);
        const page = Number(params.get("page")) || 1;
        const pageSize = Number(params.get("size")) || 5;
    
        console.log("Popstate detected:", { path, page, pageSize });
    
        if (routeConfig) {
            routeConfig.fn(container, { page, pageSize });
        }
    });
    
    const applyFiltersButton = document.getElementById("applyFiltersButton");
    applyFiltersButton.addEventListener("click", async () => {
        const newPageSize = pageSizeSelect ? Number(pageSizeSelect.value) : 5;

        const filters = await getFilters();
        console.log("Applying filters:", filters);

        updateURLParams(1, newPageSize, filters);

        await fetchAndRenderPosts(1, newPageSize, filters);
    });

    const pageSizeSelect = document.getElementById("pageSizeSelect");
    if (pageSizeSelect) {
        pageSizeSelect.value = pageSize;
        pageSizeSelect.addEventListener("change", async (event) => {
            const newPageSize = Number(event.target.value);
            const filters = await getFilters();
            console.log("Page size changed:", newPageSize);

            updateURLParams(1, newPageSize, filters);

            await fetchAndRenderPosts(1, newPageSize, filters);
        });
    }
}
