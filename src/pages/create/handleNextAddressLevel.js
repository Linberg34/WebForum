import { loadAddressOptions } from "./loadAddressOptions";
import { addressServices } from "../../storage/api/services/addressServices";

export async function handleNextAddressLevel(selectedObjectId, selectedObjectGuid, container) {
    try {
        const addressChain = await addressServices.getAddressChain(selectedObjectGuid);
        console.log("Полученная цепочка адреса:", addressChain);

        if (!addressChain || addressChain.length === 0) {
            console.error("Цепочка адресов пустая.");
            return;
        }

        const currentAddress = addressChain[addressChain.length - 1];
        const currentLevel = currentAddress?.objectLevel;
        console.log("Текущий уровень:", currentLevel);

        const childAddresses = await addressServices.searchAddresses(selectedObjectId);
        console.log("Дочерние адреса:", childAddresses);

        if (!childAddresses || childAddresses.length === 0) {
            console.log("Нет дальнейших уровней для данного адреса.");
            return;
        }

        const nextLevel = childAddresses[0].objectLevel;
        const nextLevelText = childAddresses[0].objectLevelText;

        console.log("Следующий уровень:", nextLevel, "Метка:", nextLevelText);

        const nextWrapper = document.createElement("div");
        nextWrapper.className = "address-field-wrapper";
        nextWrapper.dataset.level = addressChain.length; 
        container.appendChild(nextWrapper);

        const labelElement = document.createElement("label");
        labelElement.textContent = nextLevelText;
        nextWrapper.appendChild(labelElement);

        const selectElement = document.createElement("select");
        selectElement.className = "address-select";
        selectElement.dataset.level = addressChain.length; 
        nextWrapper.appendChild(selectElement);

        await loadAddressOptions(selectElement, selectedObjectId);

        selectElement.addEventListener("change", async (event) => {
            const newSelectedObjectId = event.target.value;
            const newSelectedOption = event.target.selectedOptions[0];
            const newSelectedObjectGuid = newSelectedOption.dataset.guid;

            const wrappersToRemove = container.querySelectorAll(`.address-field-wrapper[data-level]`);
            wrappersToRemove.forEach(wrapper => {
                const level = parseInt(wrapper.dataset.level, 10);
                if (level > addressChain.length) {
                    wrapper.remove();
                }
            });

            if (!newSelectedObjectId) return;

            await handleNextAddressLevel(newSelectedObjectId, newSelectedObjectGuid, container);
        });
    } catch (error) {
        console.error("Ошибка обработки следующего уровня адреса:", error);
    }
}
