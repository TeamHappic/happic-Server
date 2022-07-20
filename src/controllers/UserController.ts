import { Request, Response } from 'express';
import { SocialUser } from '../interfaces/SocialUser';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import BaseResponse from '../modules/BaseResponse';
import responseMessage from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import UserService from '../services/UserService';
import em from '../modules/exceptionMessage';
import jwt from '../modules/jwtHandler';
import { logger } from '../config/winstonConfig';
import User from '../models/User';
import getToken from '../modules/jwtHandler';
import { validationResult } from 'express-validator';

/**
 * @route POST /signup
 * @desc 회원가입
 * @access Private
 */
const signUp = async (req: Request, res: Response) => {
  const social = req.body.social;
  // const userId = req.body.userId;
  // const email = req.body.email;
  const charId = req.body.charId;
  const charName = req.body.charName;
  const token = req.body.token;
  console.log(social, charId, charName, token);

  // if (!social || !charId || !charName || !token) {
  //   console.log(123);
  //   return res
  //     .status(statusCode.UNAUTHORIZED)
  //     .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.NULL_VALUE_TOKEN));
  // }

  try {
    const accessToken = await UserService.signUp(charId, charName, token);
    console.log(accessToken);
    if (!accessToken) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(
          BaseResponse.failure(
            statusCode.UNAUTHORIZED,
            responseMessage.INVALID_TOKEN
          )
        );
    }
    // if (user === em.INVALID_USER) {
    //   return res
    //     .status(statusCode.UNAUTHORIZED)
    //     .send(
    //       BaseResponse.failure(
    //         statusCode.UNAUTHORIZED,
    //         responseMessage.UNAUTHORIZED_SOCIAL_USER,
    //       ),
    //     );
    // }

    const data = {
      jwtToken: accessToken,
    };

    return res
      .status(statusCode.OK)
      .send(
        BaseResponse.success(
          statusCode.OK,
          responseMessage.SIGN_UP_SUCCESS,
          data
        )
      );
  } catch (error) {
    logger.e('UserController signUp error', error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

/**
 * @route POST /signin
 * @desc Sign In
 * @access Private
 */
const signIn = async (req: Request, res: Response) => {
  console.log('first signIn');
  const { characterId } = req.body;
  const { characterName } = req.body;
  const { accessToken } = req.body;
  const userId = req.body.userId;

  try {
    const existUser = await UserService.findUserById(userId);
    const user = await UserService.signUp(
      characterId,
      characterName,
      accessToken
    );

    // if (!existUser) {
    //   const data = createUser(user);

    //   return res
    //     .status(statusCode.CREATED)
    //     .send(
    //       BaseResponse.success(statusCode.CREATED, responseMessage.SIGN_UP_SUCCESS, await data),
    //     );
    // }

    const jwtToken = getToken(existUser._id);

    const data = {
      user: existUser,
      jwtToken: jwtToken,
    };

    return res
      .status(statusCode.OK)
      .send(
        BaseResponse.success(
          statusCode.OK,
          responseMessage.SIGN_IN_SUCCESS,
          data
        )
      );
  } catch (error) {
    logger.e('UserController signIn error', error);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          responseMessage.INTERNAL_SERVER_ERROR
        )
      );
  }
};

async function createUser(user: SocialUser) {
  const newUser = await UserService.signUp(
    (user as SocialUser).characterId,
    (user as SocialUser).characterName,
    (user as SocialUser).accessToken
  );
  const jwtToken = getToken(newUser._id);

  return {
    user: newUser,
    jwtToken: jwtToken,
  };
}

// fcmToken 동록
/**
 * @router POST /movie
 * @desc Create Movie
 * @access Private
 */

const registerFcm = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  const fcmToken: string = req.body;
  const userId: string = req.body.userId;

  try {
    const data = await UserService.registerFcm(userId, fcmToken);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.REGISTER_FCM_SUCCESS, data)
      );
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

export default {
  signUp,
  signIn,
  registerFcm,
};
