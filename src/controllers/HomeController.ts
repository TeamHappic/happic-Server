import { Request, Response } from 'express';
import { logger } from '../config/winstonConfig';
import message from '../modules/responseMessage';
import { default as sc, default as statusCode } from '../modules/statusCode';
import util from '../modules/util';
import { UserService } from '../services';
import { SocialUser } from '../interfaces/SocialUser';
import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import User from '../models/User';
import { validationResult } from 'express-validator';

/**
 *  @route GET /home
 *  @desc Read User
 *  @access Public
 */
const findCharacter = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  try {
    //const user = await UserService.findUserById(req.body.user.id);
    const userId = req.body.user.id;
    const data = await UserService.findCharacter(userId);

    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }
};


/**
 *  @route GET /home/capsule
 *  @desc 캡슐 랜덤뽑기
 *  @access Private
 */

const getRandom

export default {
  findCharacter,
};