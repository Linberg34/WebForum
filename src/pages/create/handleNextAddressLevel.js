import { addressServices } from "../../storage/api/services/addressServices";

export async function handleNextAddressLevel(selectedObjectId, selectedObjectGuid, container) {
    try {
        const addressChain = await addressServices.getAddressChain(selectedObjectGuid);

        if (!addressChain || addressChain.length === 0) {
            console.error("Цепочка адресов пустая.");
            return;
        }

        const childAddresses = await addressServices.searchAddresses(selectedObjectId, "");

        if (!childAddresses || childAddresses.length === 0) {
            console.log("Нет дальнейших уровней для данного адреса.");
            return;
        }

        const nextLevel = childAddresses[0].objectLevel;
        const nextLevelText = childAddresses[0].objectLevelText;

        const nextWrapper = document.createElement("div");
        nextWrapper.className = "address-field-wrapper";
        nextWrapper.dataset.level = addressChain.length;

        const labelElement = document.createElement("label");
        labelElement.textContent = nextLevelText;
        nextWrapper.appendChild(labelElement);

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "address-input";
        inputElement.placeholder = "Начните вводить...";
        nextWrapper.appendChild(inputElement);

        const suggestionsList = document.createElement("ul");
        suggestionsList.className = "address-suggestions";
        suggestionsList.style.display = "none";
        nextWrapper.appendChild(suggestionsList);

        let currentFetchId = 0;
        inputElement.addEventListener("input", async (event) => {
            const query = event.target.value.trim();
            const level = parseInt(nextWrapper.dataset.level, 10);

            suggestionsList.innerHTML = "";
            suggestionsList.style.display = "none";

            currentFetchId += 1;
            const fetchId = currentFetchId;

            const addresses = await addressServices.searchAddresses(selectedObjectId, query);

            if (fetchId !== currentFetchId) return;

            if (addresses && addresses.length > 0) {
                addresses.forEach(addr => {
                    const li = document.createElement("li");
                    li.textContent = addr.text;
                    li.dataset.objectId = addr.objectId;
                    li.dataset.objectGuid = addr.objectGuid;
                    li.addEventListener("click", async () => {
                        inputElement.value = addr.text;
                        suggestionsList.innerHTML = "";
                        suggestionsList.style.display = "none";

                        const wrappersToRemove = container.querySelectorAll('.address-field-wrapper[data-level]');
                        wrappersToRemove.forEach(wrapper => {
                            const lvl = parseInt(wrapper.dataset.level, 10);
                            if (lvl > level) {
                                wrapper.remove();
                            }
                        });

                        if (!addr.objectId) return;

                        await handleNextAddressLevel(addr.objectId, addr.objectGuid, container);
                    });
                    suggestionsList.appendChild(li);
                });
                suggestionsList.style.display = "block";
            }
        });
    } catch (error) {
        console.error("Ошибка обработки следующего уровня адреса:", error);
    }
}
