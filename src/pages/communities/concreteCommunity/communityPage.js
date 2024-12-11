import { communityServices } from "../../../storage/api/services/communityServices.js";
import { renderCommunityDetails } from "./renderCommunityDetails.js";
import { handleSubscriptionButton } from "../subscriptionHandler.js";
import { renderCommunityPosts } from "./renderCommunityPosts.js";
import { initDropDown } from "../../profile/dropDown.js";
import { loadTags } from "../../main/loadTags.js";
import { preventIncorrectInput } from "../../main/preventIncorrectInput.js";


export async function initCommunityPage(container, params) {
    const communityId = params;
    initDropDown();
    loadTags();
    preventIncorrectInput();
    

    try {
        const community = await communityServices.getCommunityById(communityId);

        renderCommunityDetails(container, community);
        renderCommunityPosts(communityId);


        const subscribeButton = container.querySelector('.unsubscribeButton, .subscribeButton');
        if (subscribeButton) {
            handleSubscriptionButton(subscribeButton, community);
        }

    } catch (error) {
        console.error(`Ошибка при загрузке сообщества с ID ${communityId}:`, error);
        container.innerHTML = '<p>Ошибка загрузки сообщества.</p>';
    }
}
