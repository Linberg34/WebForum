import { communityServices } from "../../../storage/api/services/communityServices.js";
import { postsServices } from "../../../storage/api/services/postsServices.js";
import { renderPaginationForCommunityPosts } from "./pagination.js";



export async function renderCommunityPosts(communityId, currentPage, pageSize ,filters ={}) {
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    const userToken = sessionStorage.getItem("authToken");

    try {
        const community = await communityServices.getCommunityById(communityId);
        communityTitle.textContent = community.name;
        subscribersCount.textContent = `${community.subscribersCount} подписчиков`;
        communityType.textContent = community.isClosed ? "закрытое" : "открытое";

        writePostButton.classList.toggle("hidden", !userToken);
        writePostButton.addEventListener("click", () => {
            window.location.href = `/post/create/${communityId}`;
        });

        subscribeButton.textContent = community.isSubscribed ? "Отписаться" : "Подписаться";
        subscribeButton.addEventListener("click", async () => {
            try {
                if (community.isSubscribed) {
                    await communityServices.unsubscribeFromCommunity(communityId);
                    subscribeButton.textContent = "Подписаться";
                    community.isSubscribed = false;
                    
                } else {
                    await communityServices.subscribeToCommunity(communityId);
                    subscribeButton.textContent = "Отписаться";
                    community.isSubscribed = true;
                }
            } catch (error) {
                console.error("Ошибка при изменении подписки:", error);
                alert("Не удалось изменить подписку. Попробуйте позже.");
            }
        });

        adminList.innerHTML = "";
        community.administrators.forEach((admin) => {
            const adminCard = document.createElement("div");
            adminCard.className = "adminCard";

            const adminAvatar = document.createElement("img");
            adminAvatar.src = admin.gender === "Male"
                ? "https://img2.freepng.ru/20180620/bjw/aa6w3wksh.webp"
                : "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-4-avatar-2754580_120522.png";
            adminAvatar.alt = "Avatar";
            adminAvatar.className = `avatar ${admin.gender === "Male" ? "maleAvatar" : "femaleAvatar"}`;

            const adminName = document.createElement("span");
            adminName.textContent = admin.fullName;

            adminCard.appendChild(adminAvatar);
            adminCard.appendChild(adminName);
            adminList.appendChild(adminCard);
        });
        const response = await communityServices.getCommunityPosts(communityId,{ 
            page: currentPage, 
            size: pageSize ,
            ...filters
        });
        const posts = response.posts || [];
        const totalPosts = response.pagination?.count || 0; 



        if (posts.length === 0) {
            postsContainer.innerHTML = "<p>В этом сообществе пока нет постов.</p>";
            return;
        }

        posts.forEach((post) => {
            const postCard = document.createElement("div");
            postCard.className = "postCard";

            const postHeader = document.createElement("div");
            postHeader.className = "postHeader";

            const authorInfo = document.createElement("div");
            authorInfo.className = "authorInfo";

            const authorName = post.author || "Неизвестный автор";
            const postDate = post.createTime
                ? new Date(post.createTime).toLocaleDateString()
                : "Неизвестная дата";
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
        
        renderPaginationForCommunityPosts(currentPage, totalPosts, pageSize, (page) => {
            renderCommunityPosts(communityId, page, pageSize, filters);
        });
    } catch (error) {
        console.error("Ошибка при загрузке постов:", error);
        postsContainer.innerHTML = "<p>Не удалось загрузить посты. Возможно вы не подписаны на сообщество.</p>";
    }
}
