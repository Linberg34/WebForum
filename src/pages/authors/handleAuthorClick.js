export function handleAuthorClick(authorName) {
    const baseURL = "/";
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('author', authorName);

    window.history.pushState(null, "", `${baseURL}?${queryParams.toString()}`);

    window.dispatchEvent(new PopStateEvent('popstate'));
}
