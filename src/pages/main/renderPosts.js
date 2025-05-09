import { postsServices } from "../../storage/api/services/postsServices.js";

export function renderPosts(posts) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    const userToken = sessionStorage.getItem("authToken");
    
    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "postCard";

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

        const postTitle = document.createElement("a");
        postTitle.className = "postTitle";
        postTitle.href = `/post/${post.id}`;
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

        const postDescription = document.createElement("p");
        postDescription.className = "postDescription";

        const isLongText = post.description && post.description.length > 200;
        postDescription.textContent = isLongText
            ? `${post.description.substring(0, 200)}...`
            : post.description || "Описание отсутствует";

        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "descriptionContainer";
        descriptionContainer.appendChild(postDescription);

        if (isLongText) {
            const showMoreButton = document.createElement("button");
            showMoreButton.className = "showMoreButton";
            showMoreButton.textContent = "Читать полностью";

            showMoreButton.addEventListener("click", () => {
                postDescription.textContent = post.description;
                showMoreButton.remove();
            });

            descriptionContainer.appendChild(showMoreButton);
        }

        postBody.appendChild(descriptionContainer);

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
                    console.error("Ошибка при изменении лайка:", error);
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

        postsContainer.appendChild(postCard);
    });
}
