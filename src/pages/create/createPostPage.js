import { communityServices } from '../../storage/api/services/communityServices.js';
import { formPostData } from './formPostData.js';
import { renderAddresses } from './renderAddresses.js';
import { loadDataFromApi } from './loadDataFromApi.js';
import { initDropDown } from '../profile/dropDown.js';

export async function initCreatePostPage(container, communityId) {
    const addressContainer = document.getElementById("adressContainer");
    await renderAddresses(addressContainer);

    await initDropDown();
    await loadDataFromApi();

    const groupDropdown = document.getElementById("group");
    groupDropdown.innerHTML = "";

    if (communityId) {
        try {
            const community = await communityServices.getCommunityById(communityId);

            const option = document.createElement("option");
            option.value = communityId;
            option.textContent = community.name;
            option.selected = true;

            groupDropdown.appendChild(option);
        } catch (error) {
            console.error("Ошибка при загрузке сообщества:", error);
            alert("Не удалось загрузить данные сообщества. Попробуйте позже.");
        }
    } else {
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Без сообщества";
        defaultOption.selected = true;

        groupDropdown.appendChild(defaultOption);
    }

    formPostData(communityId || null);
}
