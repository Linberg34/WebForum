export function renderPosts(posts, user) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
        const postCard = document.createElement("div");
        postCard.className = "postCard";

        const postHeader = document.createElement("div");
        postHeader.className = "postHeader";

        const authorInfo = document.createElement("div");
        authorInfo.className = "authorInfo";

        const authorText = document.createTextNode(
            `${post.author || "Неизвестный автор"} - ${post.date || "Неизвестная дата"} в сообществе "${post.community || "Общее"}"`
        );
        authorInfo.appendChild(authorText);

        const postTitle = document.createElement("h3");
        postTitle.className = "postTitle";
        postTitle.textContent = post.title || "Без названия";

        postHeader.appendChild(authorInfo);
        postHeader.appendChild(postTitle);

        const separator = document.createElement("hr");
        separator.className = "postSeparator";

        const postBody = document.createElement("div");
        postBody.className = "postBody";

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
        commentsButton.href = `/post/${post.id}/comments`;
        commentsButton.textContent = `${post.commentsCount || 0} комментариев`;

        const likeContainer = document.createElement("div");
        likeContainer.className = "likeContainer";

        const likeButton = document.createElement("button");
        likeButton.className = "likeButton";
        likeButton.textContent = post.hasLike ? "❤️" : "🤍";
        likeButton.disabled = !user || (!user.isSubscribed && post.isPrivate);

        const likeCount = document.createElement("span");
        likeCount.className = "likeCount";
        likeCount.textContent = post.likes || 0;

        likeButton.addEventListener("click", async () => {
            if (!user) {
                alert("Поставить лайк могут только авторизованные пользователи.");
                return;
            }

            try {
                const updatedPost = await postsService.toggleLike(post.id);
                post.hasLike = !post.hasLike;
                post.likes = updatedPost.likes;
                likeButton.textContent = post.hasLike ? "❤️" : "🤍";
                likeCount.textContent = post.likes;
            } catch (error) {
                console.error("Ошибка при переключении лайка:", error);
            }
        });

        likeContainer.appendChild(likeCount);
        likeContainer.appendChild(likeButton);

        postFooter.appendChild(commentsButton);
        postFooter.appendChild(likeContainer);

        postCard.appendChild(postHeader);
        postCard.appendChild(separator);
        postCard.appendChild(postBody);
        postCard.appendChild(postFooter);

        postsContainer.appendChild(postCard);
    });
}
