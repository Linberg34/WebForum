import { initDropDown } from "../profile/dropDown";
import { fetchAndRenderPosts } from "./fetchAndRenderPosts";
import { loadTags } from "./loadTags";
import { preventIncorrectInput } from "./preventIncorrectInput";
import { updateURLParams } from "./updateUrlParams";
import { getFilters } from "./getFilterQuery.js";
import { insertEmailToDropDown } from "./insertEmailToDropDown.js";
import {getRouteConfig} from '../../app/router/routes.js';

let isInitialLoad = true; 

//TODO1. Пофиксить отображение кнопки "Написать пост"
//TODO2. Пофиксить фильтры
//TODO3. Пофиксить URLы
//TODO4. Пофиксить, что при изменении значения отображаемых страниц, страница обновляется ( а должно после применить)
//TODO5. Пофиксить комменты
//TODO6. Разбить логику CSS на файлы
//TODO7. Пофиксить лайки
//TODO7. Пофиксить изображения у постов


export async function initMainPage() {
    if (!isInitialLoad) return;
    isInitialLoad = false;  

    preventIncorrectInput();
    await insertEmailToDropDown();
    await initDropDown();
    await loadTags();

    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page")) || 1;
    const pageSize = Number(params.get("pageSize")) || 5;

    await fetchAndRenderPosts(page, pageSize);

    window.addEventListener("popstate", () => {
        const path = window.location.pathname;
        const routeConfig = getRouteConfig(path);
    
        const container = document.getElementById("app"); 
        const params = new URLSearchParams(window.location.search);
        const page = Number(params.get("page")) || 1;
        const pageSize = Number(params.get("pageSize")) || 5;
    
        console.log("Popstate detected:", { path, page, pageSize });
    
        if (routeConfig) {

            routeConfig.fn(container, { page, pageSize });
        }
    });
    

    const applyFiltersButton = document.getElementById("applyFiltersButton");
    applyFiltersButton.addEventListener("click", async () => {
        const pageSizeSelect = document.getElementById("pageSizeSelect");
        const newPageSize = pageSizeSelect ? Number(pageSizeSelect.value) : 5;
    
        const filters = await getFilters();
        console.log("Applying filters:", filters);
    
        updateURLParams(1, newPageSize, filters);
    
        await fetchAndRenderPosts(1, newPageSize);
    });
    
    

    const pageSizeSelect = document.getElementById("pageSizeSelect");
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener("change", (event) => {
            const newPageSize = Number(event.target.value);
            fetchAndRenderPosts(1, newPageSize);
            updateURLParams(1, newPageSize);
        });
    }
}
