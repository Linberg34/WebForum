export function renderPaginationForCommunityPosts(currentPage, totalPosts, pageSize, onPageChange) {
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalPosts / pageSize);
    const maxVisiblePages = 5;

    const createPageLink = (page) => {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = page;
        pageLink.className = page === currentPage ? "pageLink currentPage" : "pageLink";

        pageLink.addEventListener("click", (event) => {
            event.preventDefault();
            onPageChange(page);
        });

        return pageLink;
    };

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

    if (currentPage > 1) {
        const prevLink = document.createElement("a");
        prevLink.href = "#";
        prevLink.textContent = "«";
        prevLink.className = "pageLink prevPage";

        prevLink.addEventListener("click", (event) => {
            event.preventDefault();
            onPageChange(currentPage - 1);
        });

        paginationContainer.insertBefore(prevLink, paginationContainer.firstChild);
    }


    if (currentPage < totalPages) {
        const nextLink = document.createElement("a");
        nextLink.href = "#";
        nextLink.textContent = "»";
        nextLink.className = "pageLink nextPage";

        nextLink.addEventListener("click", (event) => {
            event.preventDefault();
            onPageChange(currentPage + 1);
        });

        paginationContainer.appendChild(nextLink);
    }
}
