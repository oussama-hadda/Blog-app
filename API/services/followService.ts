import Follow from "../models/Follow";

/* GET requests */

export const getAllFollows = async () => {
    return await Follow.findAll();
};

export const getFollow = async (followerId: string, followedId: string) => {
    return await Follow.findAll({
        where: {
            followerId: followerId,
            followedId: followedId
        }
    });
};

/* POST requests */

export const createFollow = async (FollowData: any) => {
    return await Follow.create(FollowData);
};

/* DELETE request */

export const deleteFollow = async (followerId: string, followedId: string) => {
    return await Follow.destroy({
        where: {
            followerId: followerId,
            followedId: followedId
        }
    })
}
