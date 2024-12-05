import { tagServices } from '../../storage/api/services/tagServices.js';
import { communityServices } from '../../storage/api/services/communityServices.js';

export async function loadDataFromApi() {
    try {
        const [tags, communities] = await Promise.all([
            tagServices.getTags(),
            communityServices.getCommunityList()
        ]);

        const postTagsSelect = document.getElementById('tags');
        postTagsSelect.innerHTML = '';

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.id;
            option.textContent = tag.name;
            postTagsSelect.appendChild(option);
        });

        const communitySelect = document.getElementById('group');
        communitySelect.innerHTML = '';

        communities.forEach(community => {
            const option = document.createElement('option');
            option.value = community.id;
            option.textContent = community.name;
            communitySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}
