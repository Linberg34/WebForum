import { authorServices } from "../../storage/api/services/authorServices.js";
import { handleAuthorClick } from "./handleAuthorClick.js";

const maleAvatarUrl = "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197909.png";
const femaleAvatarUrl = "https://cdn-icons-png.flaticon.com/512/53/53094.png";


export async function renderAuthors() {
    const authorsContainer = document.getElementById("authorsListContainer");
    authorsContainer.innerHTML = ""; 

    const authors = await authorServices.getAuthorsList();
    if (!authors || authors.length === 0) {
        authorsContainer.innerHTML = "<p>Авторы отсутствуют.</p>";
        return;
    }

    const filteredAuthors = authors.filter(author => author.posts > 0);
    filteredAuthors.sort((a, b) => a.fullName.localeCompare(b.fullName));

    const topAuthors = [...filteredAuthors]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3); 

    const crownColors = ["gold", "silver", "black"];

    filteredAuthors.forEach((author) => {
        const authorCard = document.createElement("div");
        authorCard.className = "authorCard";

        const authorInfo = document.createElement("div");
        authorInfo.className = "authorInfo";

        const avatarWrapper = document.createElement("div");
        avatarWrapper.className = "avatarWrapper";

        const authorAvatar = document.createElement("img");
        authorAvatar.src = author.gender === "Male" ? maleAvatarUrl : femaleAvatarUrl;
        authorAvatar.alt = "Аватар";
        authorAvatar.className = "authorAvatar";

        const topIndex = topAuthors.findIndex(top => top.fullName === author.fullName);
        if (topIndex !== -1) {
            const crown = document.createElement("div");
            crown.className = "crown";
            crown.style.backgroundColor = crownColors[topIndex];
            avatarWrapper.appendChild(crown);
        }

        avatarWrapper.appendChild(authorAvatar);

        const authorDetails = document.createElement("div");
        authorDetails.className = "authorDetails";

        const authorName = document.createElement("a");
        authorName.textContent = author.fullName;
        authorName.href = "#"; 
        authorName.className = "authorNameLink"; 
        authorName.addEventListener("click", (event) => {
            event.preventDefault(); 
            handleAuthorClick(author.fullName);
        });

        const createdDate = document.createElement("p");
        createdDate.textContent = `Создан: ${new Date(author.created).toLocaleDateString()}`;

        const birthDate = document.createElement("p");
        birthDate.textContent = `Дата рождения: ${new Date(author.birthDate).toLocaleDateString()}`;

        authorDetails.appendChild(authorName);
        authorDetails.appendChild(createdDate);
        authorDetails.appendChild(birthDate);

        authorInfo.appendChild(avatarWrapper);
        authorInfo.appendChild(authorDetails);

        const authorStats = document.createElement("div");
        authorStats.className = "authorStats";
        const postsSpan = document.createElement("span");
        postsSpan.textContent = `Постов: ${author.posts}`;
        postsSpan.className = "statsItem";
        
        const likesSpan = document.createElement("span");
        likesSpan.textContent = `Лайков: ${author.likes}`;
        likesSpan.className = "statsItem";
        
        authorStats.appendChild(postsSpan);
        authorStats.appendChild(likesSpan);
        

        authorCard.appendChild(authorInfo);
        authorCard.appendChild(authorStats);

        authorsContainer.appendChild(authorCard);
    });
}
