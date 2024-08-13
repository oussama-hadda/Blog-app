import User from '../models/User';
import Post from "../models/Post";
import Follow from "../models/Follow";
import Interaction from "../models/Interaction";
import {InteractionType, UserModifiableFieldsNames} from "../types/types";
import {handleUserServiceError} from "../controllers/utils";

/* GET requests */

export const getAllUsers = async () => {
    return await User.findAll();
};

export const getUserById = async (id: string) => {
    return await User.findByPk(id);
};

export const getUserPosts = async (userId: string) => {
    const userPosts = await Post.findAll({
        where: {
            // @ts-ignore
            userId: userId, // generated automatically
        }
    })

    if (userPosts.length === 0) {
        await handleUserServiceError(userId);
    }

    return userPosts
};

export const getUserInteractedPosts = async (userId: string, type: InteractionType) => {
    const bookmarkedPosts = await Interaction.findAll({
        attributes: [],
        include: [{
            model: Post,
            through: {
                attributes: ['id', 'title', 'content'],
            },
        },],
        where: {
            // @ts-ignore
            userId: userId,
            type: type,
        },
    })

    if (bookmarkedPosts.length === 0) {
        await handleUserServiceError(userId);
    }

    return bookmarkedPosts
}

export const getUserFollowers = async (userId: string) => {
    const usersFollowers = await Follow.findAll({
        where: {
            followed: userId,
        },
        attributes: [],
        include: [{
            model: User,
            through: {
                attributes: ['id', 'fullName'],
            },
        },],
    })

    if (usersFollowers.length === 0) {
        await handleUserServiceError(userId);
    }

    return usersFollowers
}

export const getUserFollowing = async (userId: string) => {
    const userFollowing = await Follow.findAll({
        where: {
            follower: userId,
        },
        attributes: [],
        include: [{
            model: User,
            through: {
                attributes: ['id', 'fullName'],
            },
        },],
    })

    if (userFollowing.length === 0) {
        await handleUserServiceError(userId);
    }

    return userFollowing
}

export const getUserFollowersNb = async (userId: string) => {
    const {count, rows} = await Follow.findAndCountAll({
        where: {
            followed: userId,
        }
    })

    if (count === 0) {
        await handleUserServiceError(userId);
    }

    return count
}

export const getUserFollowingNb = async (userId: string) => {
    const {count, rows} = await Follow.findAndCountAll({
        where: {
            follower: userId,
        }
    })

    if (count === 0) {
        await handleUserServiceError(userId);
    }

    return count
}

/* POST requests */

export const createUser = async (userData: any) => {
    return await User.create(userData);
};

/* PATCH requests */

export const modifyUser = async (id: string, field: string, fieldName: UserModifiableFieldsNames) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    switch (fieldName){
        case "firstName":
            user.firstName = field;
            break;
        case "lastName":
            user.lastName = field;
            break;
        case "password":
            user.password = field;
            break;
        case "description":
            user.description = field;
            break;
    }
    await user.save();
    return user;
};

/* DELETE requests */

export const deleteUserById = async (userId: string) => {
    return await User.destroy({
        where: {
            id: userId
        }
    })
}
