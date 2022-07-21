import express, { Request, Response, NextFunction } from 'express';
const app = express(); //express 이용하여 서버 띄울거니가~

import connectDB from './loaders/db';
import routes from './routes';
require('dotenv').config();
import NotificationService from './services/NotificationService';
var nodeschedule = require('node-schedule');

connectDB(); // 몽고디비에 연결한다.

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); // "routes" 폴더안의 라우터를 사용할 것

// error handler
interface ErrorType {
  message: string;
  status: number;
}

app.use(function (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 푸쉬 알람
const test = '* * 3 * * *';
nodeschedule.scheduleJob(test, function () {
  console.log('test');
});

// 푸쉬 알람
const capsuleRule = '0 5 3 * * *';
nodeschedule.scheduleJob(capsuleRule, function () {
  NotificationService.postCapsuleNotice();
});

const checkRule = '0 8 3 * * *';
nodeschedule.scheduleJob(checkRule, function () {
  NotificationService.postCheckNotice();
});

app
  .listen(process.env.PORT, () => {
    // 포트 열어주기: env에 포트있으니가 여기선 따로 안해줘도댐
    console.log(`
    ################################################
          🛡️  Server listening on port 🛡️
    ################################################
  `);
  })
  .on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
