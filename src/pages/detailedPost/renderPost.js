import { postsServices } from "../../storage/api/services/postsServices.js";
import { addressServices } from "../../storage/api/services/addressServices.js";

export async function renderPost(postId) {
    const postContainer = document.getElementById("detailedPostContainer");
    postContainer.innerHTML = "";
    const userToken = sessionStorage.getItem("authToken");

    try {
        const post = await postsServices.getPostById(postId);

        const postCard = document.createElement("div");
        postCard.className = "detailedPostCard";

        const postHeader = document.createElement("div");
        postHeader.className = "postHeader";

        const authorInfo = document.createElement("div");
        authorInfo.className = "authorInfo";

        const authorName = post.author || "Неизвестный автор";
        const postDate = post.createTime ? new Date(post.createTime).toLocaleDateString() : "Неизвестная дата";
        const communityName = post.communityName || "Общее";

        const authorText = document.createTextNode(
            `${authorName} - ${postDate} в сообществе "${communityName}"`
        );
        authorInfo.appendChild(authorText);

        const postTitle = document.createElement("h1");
        postTitle.className = "postTitle";
        postTitle.textContent = post.title || "Без названия";

        postHeader.appendChild(authorInfo);
        postHeader.appendChild(postTitle);

        const separator = document.createElement("hr");
        separator.className = "postSeparator";

        const postBody = document.createElement("div");
        postBody.className = "postBody";

        if (post.image) {
            const postImage = document.createElement("img");
            postImage.src = post.image;
            postImage.alt = "Post Image";
            postImage.className = "postImage";
            postBody.appendChild(postImage);
        }

        const postContent = document.createElement("p");
        postContent.className = "postContent";
        postContent.textContent = post.description || "Описание отсутствует";
        postBody.appendChild(postContent);

       
        const postTags = document.createElement("div");
        postTags.className = "postTags";

        if (post.tags && post.tags.length > 0) {
            post.tags.forEach((tag) => {
                const tagName = typeof tag === "string" ? tag : tag.name || "unknown";
                const tagElement = document.createElement("span");
                tagElement.textContent = `#${tagName.charAt(0).toUpperCase()}${tagName.slice(1).toLowerCase()} `;
                postTags.appendChild(tagElement);
            });
        } else {
            postTags.textContent = "Без тегов";
        }

        
        const postReadingTime = document.createElement("div");
        postReadingTime.className = "postReadingTime";
        postReadingTime.textContent = `Время чтения: ${post.readingTime || 0} мин.`;

        postBody.appendChild(postTags);
        postBody.appendChild(postReadingTime);
        
        if (post.addressId) {
            try {
                const geoData = await addressServices.getAddressChain(post.addressId); 
                if (geoData && geoData.length > 0) {
                    const geoContainer = document.createElement("div");
                    geoContainer.className = "geoContainer";

                    const geoIcon = document.createElement("i");
                    geoIcon.className = "fa fa-map-marker-alt";

                    const geoText = document.createElement("span");
                    geoText.textContent = `  ${geoData.map(g => g.text).join(", ")}`; 

                    geoContainer.appendChild(geoIcon);
                    geoContainer.appendChild(geoText);

                    postContent.appendChild(geoContainer);
                }
            } catch (error) {
                console.error("Ошибка загрузки геометки:", error);
            }
        }


        const postFooter = document.createElement("div");
        postFooter.className = "postFooter";

        

        const commentsButton = document.createElement("a");
        commentsButton.className = "commentsButton";
        commentsButton.href = `/post/${post.id}#comments`;

        const commentIcon = document.createElement("i");
        commentIcon.className = "fa fa-comment";

        const commentCount = document.createElement("span");
        commentCount.textContent = ` ${post.commentsCount || 0}`;

        commentsButton.appendChild(commentIcon);
        commentsButton.appendChild(commentCount);

        const likeContainer = document.createElement("div");
        likeContainer.className = "likeContainer";

        const likeButton = document.createElement("button");
        likeButton.className = "likeButton";
        likeButton.textContent = post.hasLike ? "❤️" : "🤍";
        likeButton.disabled = !userToken;

        const likeCount = document.createElement("span");
        likeCount.className = "likeCount";
        likeCount.textContent = post.likes || 0;

        if (userToken) {
            likeButton.addEventListener("click", async () => {
                try {
                    const updatedPost = await postsServices.toggleLike(post.id, post.hasLike);

                    post.hasLike = !post.hasLike;
                    post.likes = post.hasLike ? post.likes + 1 : post.likes - 1;

                    likeButton.textContent = post.hasLike ? "❤️" : "🤍";
                    likeCount.textContent = post.likes;
                } catch (error) {
                    console.error("Ошибка при изменении лайка:", error.message);
                    alert("Не удалось изменить лайк. Попробуйте позже.");
                }
            });
        }

        likeContainer.appendChild(likeButton);
        likeContainer.appendChild(likeCount);

        postFooter.appendChild(commentsButton);
        postFooter.appendChild(likeContainer);

        

        postCard.appendChild(postHeader);
        postCard.appendChild(separator);
        postCard.appendChild(postBody);
        postCard.appendChild(postFooter);

        postContainer.appendChild(postCard);
    } catch (error) {
        console.error("Ошибка загрузки поста:", error);
        postContainer.innerHTML = "<p>Ошибка загрузки поста. Попробуйте позже.</p>";
    }
}
