import{tagServices} from '../../storage/api/services/tagServices.js';

export async function loadTags() {
    try {
        const tags = await tagServices.getTags();
        const tagFilter = document.getElementById('tagFilter');
        tagFilter.innerHTML = '';

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.name;
            option.textContent = capitalizeFirstLetter(tag.name);
            tagFilter.appendChild(option);
        });

    } catch (error) {
        console.error('Ошибка загрузки тегов:', error);
    }
}
function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}
