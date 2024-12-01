import { communityServices } from "../../storage/api/services/communityService.js";
import { handleSubscriptionButton } from "../../components/subscriptionHandler.js";
import { renderPosts } from "../../main/renderPosts.js";

export async function initCommunityPage(container, params) {
    const communityId = params.id;

    try {
        const community = await communityServices.getCommunityById(communityId);

        renderCommunityDetails(container, community);

        renderPosts(community.posts);

        const subscribeButton = container.querySelector('.unsubscribeButton, .subscribeButton');
        if (subscribeButton) {
            handleSubscriptionButton(subscribeButton, community);
        }

    } catch (error) {
        console.error(`Ошибка при загрузке сообщества с ID ${communityId}:`, error);
        container.innerHTML = '<p>Ошибка загрузки сообщества.</p>';
    }
}
