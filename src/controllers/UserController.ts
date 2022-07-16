import { Request, Response } from "express";
import { logger } from "../config/winstonConfig";
import em from "../modules/exceptionMessage";
import jwt from "../modules/jwtHandler";
import message from "../modules/responseMessage";
import { default as sc, default as statusCode } from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services";
import {SocialUser} from "../interfaces/SocialUser";


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
      .send(util.fail(sc.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
  }
  try {
    const user = await UserService.getUser(social, token);

    if (!user) {
      return res
        .status(sc.UNAUTHORIZED)
        .send(util.fail(sc.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    if (user === em.INVALID_USER) {
      return res
        .status(sc.UNAUTHORIZED)
        .send(util.fail(sc.UNAUTHORIZED, message.UNAUTHORIZED_SOCIAL_USER));
    }

    const existUser = await UserService.findUserById(
        (user as SocialUser).userId, 
        social,
    );
    if (!existUser) {
      const data = createUser(social, user);

        return res
            .status(sc.OK)
            .send(util.success(sc.OK, message.SIGN_IN_SUCCESS, data));
    }

    const refreshToken = jwt.createRefresh();
    const accessToken = jwt.sign(existUser._id, existUser.email);

    await UserService.updateRefreshToken(existUser._id, refreshToken);

    const data = {
      user: existUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return res
        .status(sc.OK)
        .send(util.success(sc.OK, message.SIGN_IN_SUCCESS, data));
    }catch (error){
        logger.e("UserController getUser error", error);
        return res
            .status(sc.INTERNAL_SERVER_ERROR)
            .send(util.fail(sc.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));       
    }
};

async function createUser(social: string, user: SocialUser) {
    const refreshToken = jwt.createRefresh();
    const newUser = await UserService.signUpUser(
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
    getUser
};
  