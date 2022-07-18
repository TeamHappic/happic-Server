import { logger } from "../config/winstonconfig";
import User from "../models/User";
import { authStrategy } from "./SocialAuthStrategy";


export type SocialPlatform = "kakao";

const loginUser = async(social: SocialPlatform, accessToken: string) => {
    try{
        const user = await authStrategy[social].execute(accessToken);
        return user;
    } catch (error){
        logger.e(error);
        throw error;
    }  
};

const findUserById = async (userId: string, social: string) => {
    try {
      const user = await User.findOne({
        social: social,
        socialId: userId,
      });
      return user;
    } catch (error) {
      logger.e(error);
      throw error;
    }
  };
  
const signUpUser = async (social: string, socialId: string, email: string, refreshToken: string) => {
    try {
      const userCount = await User.count();
  
      const user = new User({
        name: `해픽${userCount + 1}`,
        social: social,
        socialId: socialId,
        email: email,
        refreshToken: refreshToken
      });
  
      await user.save();

      return user;
  } catch (error) {
    logger.e(error);
    throw error;
  }
};

const updateRefreshToken = async (userId: string, refreshToken: string) => {
    try {
      await User.updateOne(
        { _id: userId },
        { $set: { refreshToken: refreshToken } },
      );
    } catch (error) {
      logger.e(error);
      throw error;
    }
  };


export default {
    loginUser,
    findUserById,
    signUpUser,
    updateRefreshToken
};
