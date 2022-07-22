import { Request, Response } from 'express';
import message from '../modules/responseMessage';
import { default as sc, default as statusCode } from '../modules/statusCode';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { UserService } from '../services';
import HomeService from '../services/HomeService';
import { slackMessage } from '../modules/slackMessage';
import { sendMessageToSlack } from '../modules/slackAPI';

/**
 *  @route GET /home
 *  @desc Read User
 *  @access Public
 */
const findCharacter = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  try {
    //const user = await UserService.findUserById(req.body.userId);
    const userId = req.body.userId;
    const data = await HomeService.findCharacter(userId);
    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id
    );
    sendMessageToSlack(errorMessage);
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

/**
 * @route GET /home/capsule
 * @desc 하루캡슐 상세 조회
 * @access Public
 */
const getRandomCapsule = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const data = await HomeService.getRandomCapsule(userId);
    if (!data) {
      res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.READ_DAILY_SUCCESS, data));
  } catch (error) {
    console.log(error);
    const errorMessage: string = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      req.body.user?.id
    );
    sendMessageToSlack(errorMessage);
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
  findCharacter,
  getRandomCapsule,
};
