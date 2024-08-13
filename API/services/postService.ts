import Post from "../models/Post";
import Comment from "../models/Comment";
import {handleCategoryServiceError, handlePostServiceError} from "../controllers/utils";
import {Op} from "sequelize";
import Interaction from "../models/Interaction";

/* Get requests */

export const getAllPosts = async () => {
    return await Post.findAll();
}

export const getLastPosts = async (nb: number) => {
    return await Post.findAll(
        {
            order: [['createdAt', 'DESC']],
            limit: nb,
        }
    );
}

export const getPostById = async (id: string) => {
    return await Post.findByPk(id);
}

export const getPostsInCategory = async (category: string, offset?: number, limit?: number) => {
    let categoryPosts: Post[]
    switch (limit) {
        case undefined:
            categoryPosts = await Post.findAll({
                where: {
                    category: category,
                },
                offset: offset || 0,
            })
            break
        default:
            categoryPosts = await Post.findAll({
                where: {
                    category: category,
                },
                offset: offset || 0,
                limit: limit || 20,
            })
            break
    }
    if (categoryPosts.length === 0) {
        await handleCategoryServiceError(category);
    }
    return categoryPosts;
}

export const getPostsBetween2DatesInCategory = async (category: string, firstDate: Date, secondDate: Date) => {
    const categoryPosts = await Post.findAll({
        where: {
            category: category,
            // @ts-ignore
            createdAt: {
                [Op.lt]: firstDate,
                [Op.gt]: secondDate
            }
        },
    })
    if (categoryPosts.length === 0) {
        await handleCategoryServiceError(category);
    }
}

export const getPostComments = async (postId: string) => {
    const postComments = await Comment.findAll({
        where : {
            // @ts-ignore
            postId: postId,
        }
    })
    if (postComments.length === 0) {
        await handlePostServiceError(postId);
    }
    return postComments;
}

export const getPostLikes = async (postId: string) => {
    const postLikes = await Interaction.findAll({
        where : {
            // @ts-ignore
            postId: postId,
            type: "like"
        }
    })
    if (postLikes.length === 0) {
        await handlePostServiceError(postId);
    }
    return postLikes;
}

export const getPostNbLikes = async (postId: string) => {
    const {count, rows} = await Interaction.findAndCountAll({
        where : {
            // @ts-ignore
            postId: postId,
            type: "like"
        }
    })

    if (count === 0)  await handlePostServiceError(postId);

    return count;
}


/* POST requests */

export const createPost = async (postData: any) => {
    return await Post.create(postData);
}

/* PATCH requests */

export const addTag = async (postId: string, tag: string) => {
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    const tags = post.tags;
    tags.push(tag);
    post.tags = tags;
    return tags;
}

/* DELETE requests */

export const deleteTag = async (postId: string, tag: string) => {
    const post = await Post.findByPk(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    const tags = post.tags;
    const idx = tags.indexOf(tag);
    if (idx !== -1) {
        tags.splice(idx, 1);
    }
    post.tags = tags;
    return tags;
}

export const deletePostById = async (postId: string) => {
    return await Post.destroy({
        where: {
            id: postId,
        }
    })
}
