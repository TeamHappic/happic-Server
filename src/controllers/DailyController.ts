import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import DailyService from '../services/DailyService';

/**
 * @route GET /daily?year=&month=
 * @desc Get Movie By Movie Id
 * @access Public
 */
const getAllDaily = async (req: Request, res: Response) => {
  const { year, month } = req.query;
  const userId = req.body.user.id;

  try {
    const data = await DailyService.getAllDaily(
      userId as string,
      year as string,
      month as string
    );
    if (!data) {
      res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.READ_ALLDAILY_SUCCESS, data));
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

/**
 * @router POST /daily
 * @desc 새로운 하루 해픽 생성
 * @access
 */
const createDaily = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const filmCreateDto: FilmCreateDto = req.body;

  try {
    const data = await DailyService.createDaily(filmCreateDto);
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_DAILY_SUCCESS, data)
      );
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

/**
 * @route DELETE /daily/:filmId
 * @desc 하루 해픽을 삭제합니다
 * @access
 */
const deleteDaily = async (req: Request, res: Response) => {
  const { filmId } = req.params;
  try {
    await DailyService.deleteDaily(filmId);
    res.status(statusCode.NO_CONTENT).send(); //204
  } catch (error) {
    console.log(error);
    // 서버 내부에서 오류 발생
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
  createDaily,
  deleteDaily,
  getAllDaily,
};
