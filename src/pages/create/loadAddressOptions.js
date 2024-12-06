import { addressServices } from "../../storage/api/services/addressServices";

export async function loadAddressOptions(selectElement, parentObjectId = null) {
    try {
        const addresses = await addressServices.searchAddresses(parentObjectId);
        console.log("Загруженные адреса:", addresses);

        selectElement.innerHTML = "";

        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = "Не выбрано";
        selectElement.appendChild(emptyOption);

        if (!addresses || addresses.length === 0) {
            console.log("Нет доступных адресов для загрузки.");
            return;
        }

        const objectLevelText = addresses[0].objectLevelText;

        const wrapper = selectElement.closest('.address-field-wrapper');
        if (wrapper) {
            const label = wrapper.querySelector('label');
            if (label && !label.textContent) {
                label.textContent = objectLevelText;
            }
        }

        addresses.forEach((address) => {
            const option = document.createElement("option");
            option.value = address.objectId;
            option.textContent = address.text;
            option.dataset.guid = address.objectGuid;
            option.dataset.level = address.objectLevel;
            option.dataset.levelText = address.objectLevelText;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка загрузки адресов:", error);
    }
}
