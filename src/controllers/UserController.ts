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
    const characterId = req.body.characterId;
    const characterName = req.body.characterName;
    const accessToken = req.body.accessToken;
    console.log(social, characterId, characterName, accessToken);
    
    // if (!social || !charId || !charName || !token) {
    //   console.log(123);
    //   return res
    //     .status(statusCode.UNAUTHORIZED)
    //     .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.NULL_VALUE_TOKEN));
    // }
  
    try {
      const token = await UserService.signUp(characterId, characterName, accessToken);
    
      if (!accessToken) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(BaseResponse.failure(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
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
        jwtToken: token,
      };
      //console.log(data);
      return res
        .status(statusCode.OK)
        .send(BaseResponse.success(statusCode.OK, message.SIGN_UP_SUCCESS, data));
    } catch (error) {
      logger.e("UserController signUp error", error);
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
  //console.log("first signIn");
  //const {social} = req.body;
  const {characterId} = req.body;
  const {characterName} = req.body;
  const {accessToken} = req.body;
  const userId = req.body.userId;
  //console.log("req");
  try{
    const existUser = await UserService.findUserById(userId);
    //
    if (!existUser) {
      const user = await UserService.signUp(characterId, characterName, accessToken);
      //console.log("exist?");
      const data = {
        jwtToken: user
      };

      return res
        .status(statusCode.CREATED)
        .send(
          BaseResponse.success(statusCode.CREATED, message.SIGN_IN_SUCCESS, await data),
        );
    }
    
    const token = getToken(existUser._id);

    const data = {
      user: existUser,
      jwtToken: token,
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
  const userId: string = req.body.user.id;

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
