import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import UserService from '../services/UserService';
import { validationResult } from 'express-validator';
import getToken from '../modules/jwtHandler';
import { KeywordInfo } from '../interfaces/keyword/KeywordInfo';
import { KeywordResponseDto } from '../interfaces/keyword/KeywordResponseDto';
import { KeywordOptionType } from '../interfaces/keyword/KeywordOptionType';
import { MypageService } from '../services';

/**\
 * @route GET /mypage/keyword?year=&month=&option=
 * @desc get keyword rank
 * @access public
 */
const getAllRank = async (req: Request, res: Response) => {
  const { year, month, option } = req.query;
  const { userId } = req.params;

  try {
    let data: Object = [];
    if (year && month && option) {
      const isOptionType = (option: string): option is KeywordOptionType => {
        return ['when', 'where', 'who', 'what'].indexOf(option) !== -1;
      }; //-1이면 저안에 없는 것임

      if (!isOptionType(option as string)) {
        // 우리가 정한 option이 아닌 넘이 넘어오면 Bad Request
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
      }
      const keyword_year = Number(year);
      const keyword_month = Number(month);
      data = await MypageService.getAllRank(
        userId as string,
        keyword_year as Number,
        keyword_month as Number,
        option as KeywordOptionType
      );
    }
    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, message.GET_HAPPICREPORT_SUCCESS, data)
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

/**\
 * @route GET /mypage/keyword?year=&month=
 * @desc get keyword rank
 * @access public
 */
const getKeywordRank = async (req: Request, res: Response) => {
  const { year, month } = req.query;
  const { userId } = req.params;

  try {
    let data: Object = [];
    if (year && month) {
      const keyword_year = Number(year);
      const keyword_month = Number(month);
      data = await MypageService.getKeywordRank(
        userId as string,
        keyword_year as Number,
        keyword_month as Number
      );
    } else {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_ALL_KEYWORD_SUCCESS, data));
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

/**\
 * @route GET /mypage/category?year=&month=&option=
 * @desc get keyword rank by category
 * @access public
 */
const getKeywordByCategory = async (req: Request, res: Response) => {
  const { year, month, option } = req.query;
  const { userId } = req.params;

  try {
    let data: Object = [];
    if (year && month && option) {
      const isOptionType = (option: string): option is KeywordOptionType => {
        return ['when', 'where', 'who', 'what'].indexOf(option) !== -1;
      }; //-1이면 저안에 없는 것임

      if (!isOptionType(option as string)) {
        // 우리가 정한 option이 아닌 넘이 넘어오면 Bad Request
        return res
          .status(statusCode.BAD_REQUEST)
          .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
      }
      const keyword_year = Number(year);
      const keyword_month = Number(month);
      data = await MypageService.getKeywordByCategory(
        userId as string,
        keyword_year as Number,
        keyword_month as Number,
        option as KeywordOptionType
      );
    }
    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          message.GET_ALL_KEYWORD_BY_CATEGORY_SUCCESS,
          data
        )
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

/**\
 * @route GET /mypage/monthly?year=&month=
 * @desc get monthly report
 * @access public
 */
const getKeywordByMonth = async (req: Request, res: Response) => {
  const { year, month } = req.query;
  const { userId } = req.params;

  try {
    let data: Object = [];
    if (year && month) {
      const keyword_year = Number(year);
      const keyword_month = Number(month);
      data = await MypageService.getKeywordByMonth(
        userId as string,
        keyword_year as Number,
        keyword_month as Number
      );
    } else {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    res
      .status(statusCode.OK)
      .send(
        util.success(statusCode.OK, message.GET_MONTHLY_REPORT_SUCCESS, data)
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

export default {
  getAllRank,
  getKeywordRank,
  getKeywordByCategory,
  getKeywordByMonth,
};
