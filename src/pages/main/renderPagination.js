import { fetchAndRenderPosts } from "./fetchAndRenderPosts";
import { updateURLParams } from "./updateUrlParams";
import { getFilters } from "./getFilterQuery";
export function renderPagination(currentPage, totalPages, pageSize) {
    const paginationContainer = document.getElementById("paginationContainer");

    const paginationLinks = paginationContainer.querySelectorAll(".pageLink, .paginationDots");
    paginationLinks.forEach((link) => link.remove());

    const maxVisiblePages = 5;

    const createPageLink = (page) => {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = page;
        pageLink.className = page === currentPage ? "pageLink currentPage" : "pageLink";

        pageLink.addEventListener("click", (event) => {
            event.preventDefault();
            const filters = getFilters();
            fetchAndRenderPosts(page, pageSize);
            updateURLParams(page, pageSize, filters);
        });

        return pageLink;
    };

    if (currentPage > 1) {
        const prevLink = document.createElement("a");
        prevLink.href = `?page=${currentPage - 1}&pageSize=${pageSize}`;
        prevLink.textContent = "«";
        prevLink.className = "pageLink";

        prevLink.addEventListener("click", (event) => {
            event.preventDefault();
            const filters = getFilters();
            fetchAndRenderPosts(currentPage - 1, pageSize);
            updateURLParams(currentPage - 1, pageSize, filters);
        });

        paginationContainer.appendChild(prevLink);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        paginationContainer.appendChild(createPageLink(1));
        if (startPage > 2) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            dots.className = "paginationDots";
            paginationContainer.appendChild(dots);
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        paginationContainer.appendChild(createPageLink(page));
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement("span");
            dots.textContent = "...";
            dots.className = "paginationDots";
            paginationContainer.appendChild(dots);
        }
        paginationContainer.appendChild(createPageLink(totalPages));
    }

    if (currentPage < totalPages) {
        const nextLink = document.createElement("a");
        nextLink.href = `?page=${currentPage + 1}&pageSize=${pageSize}`;
        nextLink.textContent = "»";
        nextLink.className = "pageLink";

        nextLink.addEventListener("click", (event) => {
            event.preventDefault();
            const filters = getFilters();
            fetchAndRenderPosts(currentPage + 1, pageSize);
            updateURLParams(currentPage + 1, pageSize, filters);
        });

        paginationContainer.appendChild(nextLink);
    }
}


