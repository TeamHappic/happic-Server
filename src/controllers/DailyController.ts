import message from '../modules/responseMessage';
import statusCode from '../modules/statusCode';
import util from '../modules/util';
import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import DailyService from '../services/DailyService';
import dayjs from 'dayjs';

/**
 * @route GET /daily?year=&month=
 * @desc 하루 해픽 전체 조회
 * @access Public
 */
const getAllDaily = async (req: Request, res: Response) => {
  const { year, month } = req.query;
  const userId = req.body.userId;

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
 * @route GET /daily/:filmId
 * @desc 하루해픽 상세 조회
 * @access Public
 */
const getDaily = async (req: Request, res: Response) => {
  const { filmId } = req.params;
  const userId = req.body.userId;

  try {
    const data = await DailyService.getDaily(userId, filmId);
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
 * @access Private
 */
const createDaily = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }
  console.log(124321323124132);
  const filmCreateDto: FilmCreateDto = req.body;
  const userId = req.body.userId;

  try {
    const data = await DailyService.createDaily(userId, filmCreateDto);
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
  const userId = req.body.userId;
  try {
    await DailyService.deleteDaily(userId, filmId);
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

/**
 * @route GET /daily/posted
 * @desc get posted or non posted
 * @access public
 */
const postedDaily = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const data = await DailyService.postedDaily(userId as string);

    if (!userId) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_POSTED_DAILY, data));
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
 * @route GET /daily/keyword
 * @desc get top 9 keywords
 * @access public
 */
const getTopKeyword = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const data = await DailyService.getTopKeyword(userId as string);

    if (!userId) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, message.GET_TOP9_KEYWORDS_SUCCESS, data)
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
 *  @route GET /daily/title?year=&month=
 *  @desc Get All HappicTitle
 *  @access Public
 */
const getAllTitle = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const data = await DailyService.getAllTitle(userId as string);
    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_ALLTITLE_SUCCESS, data));
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
  createDaily,
  deleteDaily,
  postedDaily,
  getTopKeyword,
  getAllDaily,
  getAllTitle,
  getDaily,
};
