import express, { Request, Response, NextFunction } from 'express';
import config from './config';
const app = express();
import connectDB from './loaders/db';
import routes from './routes';
import NotificationService from './services/NotificationService';
require('dotenv').config();
var nodeschedule = require('node-schedule');

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes); //라우터
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
  //res.render('error');
  console.log(err);
  res.json({ error: res.locals.error });
});

// 푸쉬 알람
app.use(function (req: Request, res: Response) {
  const userId = req.body.userId;

  const capsuleRule = '0 0 8 * * *';
  nodeschedule.scheduleJob(capsuleRule, function () {
    NotificationService.postCapsuleNotice(userId);
  });

  const checkRule = '0 0 22 * * *';
  nodeschedule.scheduleJob(checkRule, function () {
    NotificationService.postCheckNotice(userId);
  });
});

app
  .listen(process.env.PORT, () => {
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

export default app;
