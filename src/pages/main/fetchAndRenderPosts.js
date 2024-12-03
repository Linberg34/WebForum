import { renderPosts } from "./renderPosts";
import{renderPagination} from "./renderPagination.js";
import { postsServices } from '../../storage/api/services/postsServices.js';

export async function fetchAndRenderPosts(page, pageSize, filters = {}) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    const finalPage = page;
    const finalPageSize = pageSize;

    try {
        filters.page = finalPage;
        filters.size = finalPageSize; 

        const response = await postsServices.getPosts(filters);

        if (response.posts && response.posts.length > 0) {
            renderPosts(response.posts);
        } else {
            postsContainer.innerHTML = "<p>Нет доступных постов.</p>";
        }

        renderPagination(
            response.pagination.current || finalPage,
            Math.ceil(response.pagination.count / finalPageSize) || 1,
            finalPageSize
        );
    } catch (error) {
        console.error("Ошибка загрузки постов:", error);
        postsContainer.innerHTML = "<p>Ошибка загрузки постов. Попробуйте позже.</p>";
    }
}

