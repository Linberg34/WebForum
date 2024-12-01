export async function renderCommunityDetails(container,community) {
    const communityTitleElement = container.querySelector('.communityTitleContainer .headerSection h2');
    communityTitleElement.textContent = `Группа "${community.name}"`;

    const subscribersCountElement = container.querySelector('.infoSection p strong');
    subscribersCountElement.textContent = `${community.subscribersCount} подписчиков`;

    const communityTypeElement = container.querySelector('.infoSection p .communityType');
    communityTypeElement.textContent = community.isClosed ? 'закрытое' : 'открытое';

    const adminListContainer = container.querySelector('.adminsSection .adminList');
    adminListContainer.innerHTML = ''; 

    community.administrators.forEach(admin => {
        const adminCard = document.createElement('div');
        adminCard.className = 'adminCard';

        const avatar = document.createElement('img');
        avatar.src = admin.avatarUrl || 'https://via.placeholder.com/50';
        avatar.alt = 'Avatar';
        avatar.className = `avatar ${admin.gender === 'Female' ? 'femaleAvatar' : 'maleAvatar'}`;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = admin.username;

        adminCard.appendChild(avatar);
        adminCard.appendChild(nameSpan);

        adminListContainer.appendChild(adminCard);
    });
}