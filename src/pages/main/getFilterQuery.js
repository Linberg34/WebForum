export async function getFilters() {
    const filters = {};

    const authorInput = document.getElementById('authorSearchInput');
    if (authorInput && authorInput.value.trim()) {
        filters.author = authorInput.value.trim();
    }

    const tagFilter = document.getElementById('tagFilter');
    if (tagFilter) {
        const selectedTags = Array.from(tagFilter.selectedOptions).map(option => option.value);
        if (selectedTags.length) {
            filters.tags = selectedTags;
        }
    }

    const sortOrder = document.getElementById('sortOrder');
    if (sortOrder) {
        filters.sorting = sortOrder.value;
    }

    const readTimeFrom = document.getElementById('readTimeFrom');
    if (readTimeFrom && readTimeFrom.value) {
        filters.min = Number(readTimeFrom.value);
    }

    const readTimeTo = document.getElementById('readTimeTo');
    if (readTimeTo && readTimeTo.value) {
        filters.max = Number(readTimeTo.value);
    }

    const onlyMyGroups = document.getElementById('onlyMyGroups');
    if (onlyMyGroups) {
        filters.onlyMyCommunities = onlyMyGroups.checked;
    }

    return filters;
}
