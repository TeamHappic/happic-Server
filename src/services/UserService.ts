import User from '../models/User';
import { logger } from '../config/winstonConfig';
import { authStrategy } from './SocialAuthStrategy';
import { FilmInfo } from '../interfaces/film/FilmInfo';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import Film from '../models/Film';

export type SocialPlatform = 'kakao';

const loginUser = async (social: SocialPlatform, accessToken: string) => {
  try {
    const user = await authStrategy[social].execute(accessToken);
    return user;
  } catch (error) {
    logger.e(error);
    throw error;
  }
};
const getUser = async (social: SocialPlatform, accessToken: string) => {
  try {
    const user = await authStrategy[social].execute(accessToken);
    return user;
  } catch (error) {
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

const signUpUser = async (
  social: string,
  socialId: string,
  email: string,
  refreshToken: string
) => {
  try {
    const userCount = await User.count();

    const user = new User({
      name: `해픽${userCount + 1}`,
      social: social,
      socialId: socialId,
      email: email,
      refreshToken: refreshToken,
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
      { $set: { refreshToken: refreshToken } }
    );
  } catch (error) {
    logger.e(error);
    throw error;
  }
};

// fmcToken 등록
const registerFcm = async (userId: string, fcmToken: string) => {
  try {
    await User.findByIdAndUpdate(userId, {
      fcmToken: fcmToken,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  loginUser,
  getUser,
  findUserById,
  signUpUser,
  updateRefreshToken,
  registerFcm,
};
