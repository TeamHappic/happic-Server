import { Request, Response } from "express";
import { logger } from "../config/winstonConfig";
import em from "../modules/exceptionMessage";
import jwt from "../modules/jwtHandler";
import message from "../modules/responseMessage";
import { default as sc, default as statusCode } from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services";
import {SocialUser} from "../interfaces/SocialUser";
import responseMessage from "../modules/responseMessage";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import CharService from "../services/CharService";
import { CharCreateDto } from "../interfaces/user/CharCreateDto";
import BaseResponse from "../modules/BaseResponse";

/**
 * @route POST /character
 * @desc Determine Char Info 
 * @access Public
 */
const createChar = async (req: Request, res: Response): Promise<void> => {
    const charCreateDto: CharCreateDto = req.body;
    //console.log(charCreateDto);
    try {
        const data: PostBaseResponseDto = await CharService.createChar(charCreateDto);
        
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATED_CHAR_SUCCESS, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
}

// /**
//  * @route PATCH /setting
//  * @desc Change Char Info
//  * @access Private
//  */
//  const changeChar = async (req: Request, res: Response): Promise<void> => {
//     const charChangeDto: CharChangeDto = req.body;
//     const {}

//     try {
//         await CharService.changeChar(charChangeDto);
        
//         res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.CREATED_CHAR_SUCCESS, data));
//     }catch (error){
//         console.log(error);
//         res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
//     }
// }

/**
 * @route POST /auth
 * @desc Authenticate user & Get token
 * @access Private
 */
 const getUser = async (req: Request, res: Response) => {
    const social = req.body.social;
    const token = req.body.token;
  
    if (!social || !token) {
      return res
        .status(sc.UNAUTHORIZED)
        .send(BaseResponse.failure(sc.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
    }
    try {
      const user = await UserService.getUser(social, token);
  
      if (!user) {
        return res
          .status(sc.UNAUTHORIZED)
          .send(BaseResponse.failure(sc.UNAUTHORIZED, message.INVALID_TOKEN));
      }
      if (user === em.INVALID_USER) {
        return res
          .status(sc.UNAUTHORIZED)
          .send(
            BaseResponse.failure(
              sc.UNAUTHORIZED,
              message.UNAUTHORIZED_SOCIAL_USER,
            ),
          );
      }
  
      const existUser = await (UserService as any).findUserById(
        (user as SocialUser).userId,
        social,
      );
      if (!existUser) {
        const data = createUser(social, user);
  
        return res
          .status(sc.CREATED)
          .send(
            BaseResponse.success(sc.CREATED, message.SIGN_UP_SUCCESS, await data),
          );
      }
  
      const refreshToken = jwt.createRefresh();
      const accessToken = jwt.sign(existUser._id, existUser.email);
  
      await (UserService as any).updateRefreshToken(existUser._id, refreshToken);
  
      const data = {
        user: existUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
  
      return res
        .status(sc.OK)
        .send(BaseResponse.success(sc.OK, message.SIGN_IN_SUCCESS, data));
    } catch (error) {
      logger.e("UserController getUser error", error);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(
          BaseResponse.failure(
            sc.INTERNAL_SERVER_ERROR,
            message.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  };
  
  async function createUser(social: string, user: SocialUser) {
    const refreshToken = jwt.createRefresh();
    const newUser = await (UserService as any).signUpUser(
      social,
      (user as SocialUser).userId,
      (user as SocialUser).email,
      refreshToken,
    );
    const accessToken = jwt.sign(newUser._id, newUser.email);
  
    return {
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

export default{
    getUser,
    createChar
};
  