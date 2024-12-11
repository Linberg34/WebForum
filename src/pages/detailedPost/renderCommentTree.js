import { createCommentElement } from "./createCommentElement";
export function renderCommentTree(comment, postId) {
    const commentElement = createCommentElement(comment, postId, () => {
        renderComments(postId); 
    });

    if (comment.subComments && comment.subComments.length > 0) {
        const repliesContainer = commentElement.querySelector(".repliesContainer");
        comment.subComments.forEach((subComment) => {
            const subCommentElement = renderCommentTree(subComment, postId);
            repliesContainer.appendChild(subCommentElement);
        });
        repliesContainer.style.display = "block";
    }

    return commentElement;
}
