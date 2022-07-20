import { Types } from 'mongoose';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import config from '../config';
import { logger } from '../config/winstonConfig';
import em from './exceptionMessage';

const sign = (userId: Types.ObjectId, email: String) => {
  const payload = {
    id: userId,
    email: email
  };

  let validityDate = "14d";
  if (process.env.NODE_ENV === "production") {
    validityDate = "14d";
  }

  const jwtToken: string = jwt.sign(
    // 암호화
    payload,
    config.jwtSecret,
    {expiresIn: validityDate} // 14일동안
  );
  return jwtToken;
};

const verify = (token: string) => {
  try {
    console.log(token);
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    if ((error as JsonWebTokenError).message === 'jwt expired') {
      logger.e('만료된 토큰입니다.');
      return em.TOKEN_EXPIRED;
    }
    if ((error as JsonWebTokenError).message === 'invalid signature') {
      logger.e('유효하지 않은 토큰입니다.');
      return em.TOKEN_INVALID;
    }
    logger.e('유효하지 않은 토큰입니다.');

    return em.TOKEN_INVALID;
  }
};

export default {
  sign,
  verify,
};
