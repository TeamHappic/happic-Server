import { SocialUser } from "../interfaces/SocialUser";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import BaseResponse from "../modules/BaseResponse";
import responseMessage from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import UserService from "../services/UserService";
import em from '../modules/exceptionMessage';
import jwt from '../modules/jwtHandler';
import { logger } from "../config/winstonConfig";

/**
 * @route POST user/signup
 * @desc 회원가입
 * @access Private
 */
 const signUp = async (req: Request, res: Response): Promise<void> => {
    const social = req.body.social;
    // const userId = req.body.userId;
    // const email = req.body.email;
    const charId = req.body.charId;
    const charName = req.body.charName;
    const token = req.body.token;
    
    if (!social || !charId || !charName || !token) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.NULL_VALUE_TOKEN));
    }
  
    try {
      const user = await UserService.signUp(social, charId, charName, token);
  
      if (!user) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
      }
      if (user === em.INVALID_USER) {
        return res
          .status(statusCode.UNAUTHORIZED)
          .send(
            BaseResponse.failure(
              statusCode.UNAUTHORIZED,
              responseMessage.UNAUTHORIZED_SOCIAL_USER,
            ),
          );
      }

      const existUser = await UserService.findUserById(
        (user as SocialUser).userId,
        social
      );
      if (!existUser) {
        const data = createUser(social, charName, token);
        
        return res
          .status(statusCode.CREATED)
          .send(
            BaseResponse.success(statusCode.CREATED, responseMessage.SIGN_UP_SUCCESS, await data),
          );
      }

      const jwtToken = jwt.sign(existUser._id, existUser.email);
      
      const data = {
        user: existUser,
        jwtToken: jwtToken,
      };

      return res
        .status(statusCode.OK)
        .send(BaseResponse.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, data));
    } catch (error) {
      logger.e("UserController signUp error", error);
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

  async function createUser(social:string, user: SocialUser) {
    const newUser = await UserService.signUp(
      social,
      (user as SocialUser).characterId,
      (user as SocialUser).characterName,
      (user as SocialUser).accessToken
    );
    const jwtToken = jwt.sign(newUser._id, newUser.email);
  
    return {
      user: newUser,
      jwtToken: jwtToken
    };
  }

//   /**
//  * @route POST /signup
//  * @desc Sign Up
//  * @access Private
//  */
// const signIn = async (req: Request, res: Response) => {
//   const token = req.body.token;

//   if (!token) {
//     return res
//       .status(statusCode.UNAUTHORIZED)
//       .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.NULL_VALUE_TOKEN));
//   }
//   try {
//     const user = await UserService.loginUser(token);

//     if (!user) {
//       return res
//         .status(statusCode.UNAUTHORIZED)
//         .send(BaseResponse.failure(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN));
//     }
//     if (user === em.INVALID_USER) {
//       return res
//         .status(statusCode.UNAUTHORIZED)
//         .send(
//           BaseResponse.failure(
//             statusCode.UNAUTHORIZED,
//             responseMessage.UNAUTHORIZED_SOCIAL_USER
//           )
//         );
//     }

//     const existUser = await UserService.findUserById(
//       (user as SocialUser).userId,
//       social
//     );

//     if (!existUser) {
//       const data = createUser(social, user);

//       return res
//         .status(sc.CREATED)
//         .send(
//           BaseResponse.success(sc.CREATED, message.SIGN_UP_SUCCESS, await data)
//         );
//     }

//     const jwtToken = jwt.sign(existUser._id, existUser.email);

//     const data = {
//       user: existUser,
//       jwtToken: jwtToken,
//     };

//     return res
//       .status(statusCode.OK)
//       .send(BaseResponse.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, data));
//   } catch (error) {
//     logger.e('UserController loginUser error', error);
//     return res
//       .status(statusCode.INTERNAL_SERVER_ERROR)
//       .send(
//         BaseResponse.failure(
//           statusCode.INTERNAL_SERVER_ERROR,
//           responseMessage.INTERNAL_SERVER_ERROR
//         )
//       );
//   }
// };

  

export default {
    signUp,
};
