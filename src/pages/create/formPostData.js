import { postsServices } from "../../storage/api/services/postsServices.js";

export function formPostData(communityId) {
    document.getElementById("createPostForm").addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const addressContainer = document.getElementById("adressContainer");
        const { addressGuid, addressId } = collectSelectedAddress(addressContainer);

        const postData = {          
            title: document.getElementById("title").value.trim(),
            description: document.getElementById("text").value.trim(), 
            readingTime: parseInt(document.getElementById("readingTime").value.trim(), 10) || 0, 
            image: document.getElementById("image").value.trim() || null, 
            addressId: addressGuid || null, 
            tags: Array.from(document.getElementById("tags").selectedOptions).map(
                (option) => option.value
            ),
            communityId: communityId || null
        };
    
        if (!postData.title || !postData.description || !postData.readingTime || !postData.tags.length) {
            alert("Название, тег, время и текст обязательны для заполнения.");
            return;
        }
        
        console.log("Отправляемые данные:", JSON.stringify(postData, null, 2));

        try {
            const response = await postsServices.createPost(postData);
            console.log("Ответ сервера:", response);
            if (response) {
                alert("Пост успешно создан!");
                window.location.href = "/"; 
            } else {
                console.log("Неизвестный ответ сервера.");
            }
        } catch (error) {
            console.error("Ошибка при создании поста:", error);
            alert("Не удалось создать пост. Попробуйте позже.");
        }
    });
}

function collectSelectedAddress(container) {
    const selects = container.querySelectorAll("select.address-select");
    let lastSelectedGuid = null;
    let lastSelectedId = null;

    selects.forEach(select => {
        if (select.value) {
            const selectedOption = select.selectedOptions[0];
            if (selectedOption) {
                lastSelectedGuid = selectedOption.dataset.guid;
                lastSelectedId = selectedOption.value;
            }
        }
    });

    return { addressGuid: lastSelectedGuid, addressId: lastSelectedId };
}
