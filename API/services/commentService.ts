import Comment from "../models/Comment";

/* GET requests */

export const getAllComments = async () => {
    return await Comment.findAll();
};

export const getCommentById = async (id: string) => {
    return await Comment.findByPk(id);
};

/* POST requests */

export const createComment = async (commentData: any) => {
    return await Comment.create(commentData);
};

/* PATCH request */

export const changeCommentContent = async (id: string, content: string) => {
    const comment = await Comment.findByPk(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    comment.content = content;
    return comment;
}

/* DELETE request */

export const deleteCommentById = async (commentId: string) => {
    return await Comment.destroy({
        where: {
            id: commentId,
        }
    })
}
