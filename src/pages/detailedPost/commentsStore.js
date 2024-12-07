
export const commentsById = new Map();

export function indexComments(comment, isRoot = false) {
    comment.isRoot = isRoot;

    commentsById.set(comment.id, comment);

    if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach(child => {
            indexComments(child, false);
        });
    }
}

