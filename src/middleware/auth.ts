import express, { Request, Response, NextFunction } from "express";
import jwt from "../modules/jwtHandler";
import { JwtPayload } from "jsonwebtoken";
import { logger } from "../config/winstonConfig";
import config from "../config";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import exceptionMessage from "../modules/exceptionMessage";

export default (req: Request, res: Response, next: NextFunction) => {
    // request-header 에서 토큰 받아오기
    const token = req.headers.token;
 
    // 토큰 유무 검증
    if (!token) {
        // 토근없으면 접근 금지! 401
        return res
            .status(statusCode.UNAUTHORIZED)
            .send(util.fail(statusCode.UNAUTHORIZED, message.NULL_VALUE_TOKEN));
    }

    // 토큰 검증
    try {
        // jwt.verify(token,secret key) : jwt token 해독
        const decoded = jwt.verify(token as string);

        // payload 꺼냉기 - decoded 타입 단언 필요
        req.body.user = (decoded as any).user;

        // next : middleware 끝나면 다음으로 넘기기
        next();
    } catch (error:any) {
        console.log(error); 
        if (error.name === 'TokenExpiredError') { // 토큰 끝나면 
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
        }
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};