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
            attributes: ['id', 'title', 'content'],
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
            followedId: userId,
        },
        attributes: [],
        include: [{
            model: User,
            as: "Follower",
            attributes: ['id', 'firstName', 'lastName'],
        }],
    })
        .then(userFollowers => userFollowers.map( // Flatten userFollowers and get fullName
            follow => ({
                // @ts-ignore
                "id": follow.Follower.id,
                // @ts-ignore
                "fullName": `${follow.Follower.firstName} ${follow.Follower.lastName}`,
            })
        ))

    if (usersFollowers.length === 0) {
        await handleUserServiceError(userId);
    }

    return usersFollowers
}

export const getUserFollowing = async (userId: string) => {
    const userFollowing = await Follow.findAll({
        where: {
            followerId: userId,
        },
        attributes: [],
        include: [{
            model: User,
            as: "Followed",
            attributes: ['id', 'firstName', 'lastName'],
        }],
    })
        .then(userFollowing => userFollowing.map(
            follow => ({
                // @ts-ignore
                "id": follow.Followed.id,
                // @ts-ignore
                "fullName": `${follow.Followed.firstName} ${follow.Followed.lastName}`,
            })
        ))

    if (userFollowing.length === 0) {
        await handleUserServiceError(userId);
    }

    return userFollowing
}

export const getUserFollowersNb = async (userId: string) => {
    const {count, rows} = await Follow.findAndCountAll({
        where: {
            followedId: userId,
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
            followerId: userId,
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
    switch (fieldName) {
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
