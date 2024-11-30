import { getFilters } from "./getFilterQuery";
import { renderPosts } from "./renderPosts";
import{renderPagination} from "./renderPagination.js";
import { postsServices } from '../../storage/api/services/postsServices.js';

export async function fetchAndRenderPosts(page, pageSize) {
    const params = new URLSearchParams(window.location.search);

    const finalPage = page || Number(params.get("page")) || 1;
    const finalPageSize = pageSize || Number(params.get("pageSize")) || 5;


    try {
        const filters = await getFilters();
        filters.page = finalPage;
        filters.pageSize = finalPageSize;

        const response = await postsServices.getPosts(filters);

        if (response.posts && response.posts.length > 0) {
            renderPosts(response.posts);
        } else {
            const postsContainer = document.getElementById("postsContainer");
            postsContainer.innerHTML = "<p>Нет доступных постов.</p>";
        }

        renderPagination(
            response.pagination.current || finalPage,
            Math.ceil(response.pagination.count / finalPageSize) || 1,
            finalPageSize
        );
    } catch (error) {
        console.error("Ошибка загрузки постов:", error);
        const postsContainer = document.getElementById("postsContainer");
        postsContainer.innerHTML = "<p>Ошибка загрузки постов. Попробуйте позже.</p>";
    }
}
