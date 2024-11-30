export async function toggleLike(postId) {
    try {
        const post = await postsService.getPostById(postId);
        if (post.hasLike) {
            await postsService.removeLike(postId);
        } else {
            await postsService.likePost(postId);
        }
    } catch (error) {
        console.error('Ошибка при смене лайка:', error);
    }
}
