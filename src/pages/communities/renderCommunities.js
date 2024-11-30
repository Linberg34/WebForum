import { communityServices } from "../../storage/api/services/communityService.js";
import { handleSubscriptionButton } from "./subscriptionHandler.js";

export async function renderCommunities(user) {
    const communitiesContainer = document.getElementById("communitiesContainer");
    communitiesContainer.innerHTML = ""; 
    const communities = await communityServices.getCommunityList();

    if (communities.length === 0) {
        communitiesContainer.innerHTML = "<p>Сообщества отсутствуют.</p>";
        return;
    }

    communities.forEach((community) => {
        const communityCard = document.createElement("div");
        communityCard.className = "communityCard";

        const communityTitle = document.createElement("a");
        communityTitle.href = `/community/${community.id}`; 
        communityTitle.className = "communityTitle";
        communityTitle.textContent = community.name;

        const subscribeButton = document.createElement("button");
        subscribeButton.className = community.isClosed ? "closedButton" : "subscribeButton";
        subscribeButton.textContent = community.isClosed ? "Закрыто" : "Подписаться";

        handleSubscriptionButton(subscribeButton, community, user);

        communityCard.appendChild(communityTitle);
        communityCard.appendChild(subscribeButton);

        communitiesContainer.appendChild(communityCard);
    });
}
