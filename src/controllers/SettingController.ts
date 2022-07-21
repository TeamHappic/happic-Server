import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import SettingService from '../services/SettingService';

/**
 * @route PATCH /setting
 * @desc 캐럭터 정보를 변경합니다
 * @access Public
 */
const changeChar = async (req: Request, res: Response) => {
  const { characterId, characterName } = req.body;
  const userId = req.body.userId;

  try {
    await SettingService.changeChar(userId, characterId, characterName);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.CHANGE_CHARACTER_SUCCESS));
  } catch (error) {
    console.log(error);
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
  changeChar,
};
