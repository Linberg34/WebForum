export async function getFilters() {
    const filters = {};

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

    return filters;
}
