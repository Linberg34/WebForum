import { handleNextAddressLevel } from "./handleNextAddressLevel";
import { addressServices } from "../../storage/api/services/addressServices";

export async function renderAddresses(container) {
    container.innerHTML = "";

    const initialWrapper = document.createElement("div");
    initialWrapper.className = "address-field-wrapper";
    initialWrapper.dataset.level = 0;
    container.appendChild(initialWrapper);

    const initialLabel = document.createElement("label");
    initialLabel.textContent = "Субъект РФ";
    initialWrapper.appendChild(initialLabel);

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.className = "address-input";
    inputElement.placeholder = "Начните вводить...";
    initialWrapper.appendChild(inputElement);

    const suggestionsList = document.createElement("ul");
    suggestionsList.className = "address-suggestions";
    suggestionsList.style.display = "none";
    initialWrapper.appendChild(suggestionsList);

    let currentFetchId = 0;

    inputElement.addEventListener("input", async (event) => {
        const query = event.target.value.trim();
        const level = parseInt(initialWrapper.dataset.level, 10);

        suggestionsList.innerHTML = "";
        suggestionsList.style.display = "none";

        currentFetchId += 1;
        const fetchId = currentFetchId;

        const addresses = await addressServices.searchAddresses(null, query);

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
}
