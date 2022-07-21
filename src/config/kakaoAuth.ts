import axios from 'axios';
import exceptionMessage from '../modules/exceptionMessage';
import { SocialUser } from '../interfaces/SocialUser';
import { logger } from './winstonConfig';

const kakaoAuth = async (kakaoAccessToken: string) => {
  try {
    const user = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const userId = user.data.id;

    if (!userId) 
      return exceptionMessage.INVALID_USER;

    if (!user.data.kakao_account) {
      return {
        userId: userId,
        email: user.data.kakao_account.email
      };
    }

    const kakaoUser: SocialUser = {
      userId: userId,
      email: user.data.kakao_account.email,
      characterId: 0,
      characterName: '',
      accessToken: kakaoAccessToken
    };

    return kakaoUser;
  } catch (error) {
    logger.e('KakaoAuth error', error);
    return null;
  }
};

export default {
  kakaoAuth,
};
