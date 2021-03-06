import User from '../models/User';
import { logger } from '../config/winstonConfig';
import { authStrategy } from './SocialAuthStrategy';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import Film from '../models/Film';
import kakaoAuth from '../config/kakaoAuth';
import { SocialUser } from '../interfaces/SocialUser';
import axios from 'axios';
import getToken from '../modules/jwtHandler';
import { UserFcmTokenDto } from '../interfaces/user/UserFcmTokenDto';

export type SocialPlatform = 'kakao';

//로그인
const signIn = async (social: SocialPlatform, accessToken: string) => {
  try {

    const user = await authStrategy[social].execute(accessToken);
    return user;
    
  } catch (error) {
    logger.e(error);
    throw error;
  }
};

const findUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    //console.log(user);
    return user;
  } catch (error) {
    logger.e(error);
    throw error;
  }
};

//회원가입
const signUp = async (
  //social: string,
  characterId: number,
  characterName: string,
  accessToken: string
) => {
  //console.log("first signup");
  try {
    const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

   // console.log("kakaouser");

    const kakaoUserData = kakaoUser.data;

    // 카카오 계정이 있는지 체크
    if (!kakaoUserData.id) {
      return null;
    }

    const existUser = await User.findOne({
      socialId: kakaoUserData.id as string,
    });

    if (!existUser) {
      const user = new User({
        name: `해픽${characterId}`,
        social: 'kakao',
        email: 'asdf',
        socialId: kakaoUserData.id,
        characterId: characterId,
        characterName: characterName,
        growthRate: 0,
        level: 1,
        film: [],
        count: 0,
        fcmToken: '12123',
      });

      const jwtToken = getToken(user.id);
      user.accessToken = jwtToken;
      await user.save();

      return jwtToken;
    }

    // 유저가 db에 있음
    existUser.accessToken = getToken(existUser.id);
    await User.findByIdAndUpdate(existUser._id, existUser);
    return existUser.accessToken;

    //if (!email) {

    // } else {
    //   user = new User({
    //     name: `해픽${socialId}`,
    //     social: social,
    //     socialId: socialId,
    //     email: email,
    //   });
    // }
  } catch (error) {
    logger.e('', error);
    throw error;
  }
};

// fmcToken 등록
const registerFcm = async (userId: string, fcmToken: UserFcmTokenDto) => {
  try {
    await User.findByIdAndUpdate(userId, {
      fcmToken: fcmToken.fcmToken,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signUp,
  signIn,
  findUserById,
  registerFcm,
};
