// import { Request, Response } from "express";
// import statusCode from "../modules/statusCode";
// import message from "../modules/responseMessage";
// import util from "../modules/util";
// import jwt from "../modules/jwtHandler";
// import exceptionMessage from "../modules/exceptionMessage";
// import UserService from "../services/UserService";

// /**
//  * @route GET /auth/token
//  * @desc Get new access token by refresh token
//  * @access private
//  */
// const getToken = async (req: Request, res: Response) => {
//   const accessToken = req.headers.accesstoken;
//   const refreshToken = req.headers.refreshtoken;

//   if (!accessToken || !refreshToken) {
//     return res
//       .status(statusCode.BAD_REQUEST)
//       .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE_TOKEN));
//   }

//   try {
//     const access = jwt.verify(accessToken as string);

//     if (access === exceptionMessage.TOKEN_INVALID) {
//       return res
//         .status(statusCode.UNAUTHORIZED)
//         .send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
//     }

//     if (access === exceptionMessage.TOKEN_EXPIRED) {
//         const refresh = jwt.verify(refreshToken as string);

//         if (refresh === exceptionMessage.TOKEN_INVALID) {
//           return res
//             .status(statusCode.UNAUTHORIZED)
//             .send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
//         }

//         if (refresh === exceptionMessage.TOKEN_EXPIRED) {
//           return res
//             .status(statusCode.UNAUTHORIZED)
//             .send(util.fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));
//         }

//         const user = await UserService.findUserByRfToken(refreshToken as string);
//         const data = {
//           accessToken: jwt.sign(user?._id, user?.email as string),
//           refreshToken: refreshToken,
//         };

//         return res
//         .status(statusCode.OK)
//         .send(util.success(statusCode.OK, message.CREATE_TOKEN_SUCCESS, data));
//     }
//     return res
//       .status(statusCode.BAD_REQUEST)
//       .send(util.fail(statusCode.BAD_REQUEST, message.VALID_TOKEN));
//   } catch (error) {
//     return res
//       .status(statusCode.INTERNAL_SERVER_ERROR)
//       .send(
//         util.fail(
//           statusCode.INTERNAL_SERVER_ERROR,
//           message.INTERNAL_SERVER_ERROR,
//         ),
//       );
//   }
// };

// export default { getToken };