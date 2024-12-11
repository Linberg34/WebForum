import { communityServices } from "../../storage/api/services/communityServices.js";

export async function handleSubscriptionButton(button, community) {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
        button.disabled = true;
        button.textContent = "Войдите, чтобы подписаться";
        button.className = "disabledButton";
        return;
    }

    try {
        const userSubscribedCommunities = await communityServices.getUsersCommunities();

        const subscription = userSubscribedCommunities.find(sub => sub.communityId === community.id);

        const isAdmin = subscription && subscription.role === 'Administrator';
        const isSubscribed = !!subscription;

        if (isAdmin) {
            button.style.display = 'none';
            return;
        }

        if (isSubscribed) {
            button.textContent = "Отписаться";
            button.className = "unsubscribeButton";

            const newButton = button.cloneNode(true);
            button.replaceWith(newButton);
            button = newButton;

            button.addEventListener("click", async () => {
                try {
                    await communityServices.unsubscribeFromCommunity(community.id);
                    alert(`Вы успешно отписались от сообщества "${community.name}"`);

                    button.textContent = "Подписаться";
                    button.className = "subscribeButton";

                } catch (error) {
                    console.error(`Ошибка при отписке от сообщества "${community.name}":`, error);
                    alert("Не удалось отписаться. Попробуйте позже.");
                }
            });
        } else {
            button.textContent = "Подписаться";
            button.className = "subscribeButton";

            const newButton = button.cloneNode(true);
            button.replaceWith(newButton);
            button = newButton;

            button.addEventListener("click", async () => {
                try {
                    await communityServices.subscribeToCommunity(community.id);
                    alert(`Вы успешно подписались на сообщество "${community.name}"`);

                    button.textContent = "Отписаться";
                    button.className = "unsubscribeButton";

                } catch (error) {
                    console.error(`Ошибка при подписке на сообщество "${community.name}":`, error);
                    alert("Не удалось подписаться. Попробуйте позже.");
                }
            });
        }
    } catch (error) {
        console.error("Ошибка при проверке подписки:", error);
        button.disabled = true;
        button.textContent = "Ошибка проверки подписки";
        button.className = "disabledButton";
    }
}
