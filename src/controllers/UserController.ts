import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import UserService from '../services/UserService';

const today = new Date()

const isSameDate = (date1,today)=>{
    return date1.getFullYear() === today.getFullYear()
       && date1.getMonth() === today.getMonth()
       && date1.getDate() === today.getDate();
}

/**
 *  @route GET /home
 *  @desc Read User
 *  @access Public
 */
 const findUserById = async (req: Request, res: Response) => {

    try {
        const user = await UserService.findUserById(req.body.user.id);
        if (!user) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        const data = {
            "name":user.name,
            "growth_rate":user.growthRate,
            "level":user.level,
            "isPosted":,
        }
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_USER_SUCCESS, data),
        );
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

export default {
    findUserById,
};
