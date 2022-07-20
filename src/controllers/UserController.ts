import { Request, Response } from 'express';
import { SocialUser } from '../interfaces/SocialUser';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import BaseResponse from '../modules/BaseResponse';
import message from '../modules/responseMessage';
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
    const charId = req.body.charId;
    const charName = req.body.charName;
    const token = req.body.token;
    //console.log(social, charId, charName, token);
    
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
          .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
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

  try {
    const accessToken = await UserService.signUp(charId, charName, token);
    console.log(accessToken);
    if (!accessToken) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(
          BaseResponse.failure(statusCode.UNAUTHORIZED, message.INVALID_TOKEN)
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
      .send(BaseResponse.success(statusCode.OK, message.SIGN_UP_SUCCESS, data));
  } catch (error) {
    logger.e('UserController signUp error', error);
    return res
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
    
    if (!existUser) {
      const user = await UserService.signUp(characterId, characterName, accessToken);
    
      return res
        .status(statusCode.CREATED)
        .send(
          BaseResponse.success(statusCode.CREATED, responseMessage.SIGN_UP_SUCCESS, await user),
        );
    }

    if (!existUser) {
      const data = await UserService.signUp(
        characterId,
        characterName,
        accessToken
      );

      return res
        .status(statusCode.CREATED)
        .send(
          BaseResponse.success(statusCode.CREATED, message.SIGN_UP_SUCCESS, data),
        );
    }

    const jwtToken = getToken(existUser._id);

    const data = {
      user: existUser,
      jwtToken: jwtToken,
    };

    return res
      .status(statusCode.OK)
      .send(BaseResponse.success(statusCode.OK, message.SIGN_IN_SUCCESS, data));
  } catch (error) {
    logger.e('UserController signIn error', error);
    return res
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
