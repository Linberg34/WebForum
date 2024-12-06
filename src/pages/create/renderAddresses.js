import { loadAddressOptions } from "./loadAddressOptions";
import { handleNextAddressLevel } from "./handleNextAddressLevel";

export async function renderAddresses(container) {
    if (!container) {
        console.error("Контейнер для адресов не найден.");
        return;
    }

    container.innerHTML = "";

    const initialWrapper = document.createElement("div");
    initialWrapper.className = "address-field-wrapper";
    initialWrapper.dataset.level = 0; 
    container.appendChild(initialWrapper);

    const initialLabel = document.createElement("label");
    initialLabel.textContent = "Субъект РФ"; 
    initialWrapper.appendChild(initialLabel);

    const initialSelect = document.createElement("select");
    initialSelect.id = "regionSelect"; 
    initialSelect.className = "address-select";
    initialSelect.dataset.level = 0; 
    initialWrapper.appendChild(initialSelect);

    const emptyOption = document.createElement("option");
    emptyOption.value = "";
    emptyOption.textContent = "Не выбрано";
    initialSelect.appendChild(emptyOption);

    await loadAddressOptions(initialSelect);

    initialSelect.addEventListener("change", async (event) => {
        const selectedObjectId = event.target.value;
        const selectedOption = event.target.selectedOptions[0];
        const selectedObjectGuid = selectedOption.dataset.guid;

        const wrappersToRemove = container.querySelectorAll(`.address-field-wrapper[data-level]`);
        wrappersToRemove.forEach(wrapper => {
            const level = parseInt(wrapper.dataset.level, 10);
            if (level > 0) {
                wrapper.remove();
            }
        });

        if (!selectedObjectId) return; 

        await handleNextAddressLevel(selectedObjectId, selectedObjectGuid, container);
    });
}
