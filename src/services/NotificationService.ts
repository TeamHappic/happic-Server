import User from '../models/User';
import Film from '../models/Film';
import admin from 'firebase-admin';
let serviceAccount = require('../../firebase-admin.json');

const postCapsuleNotice = async (): Promise<void> => {
  try {
    const users = await User.find({}, { count: 1, fcmToken: 1 });
    if (!users) {
      return null;
    }

    let fcmTokens: string[] = [];

    for (var i = 0; i < users.length; i++) {
      const count = users[i].count;
      if ((count as number) % 10 !== 0) {
        return;
      }
      const fcmToken = users[i].fcmToken;
      fcmTokens.push(fcmToken);
    }

    const message = {
      android: {
        notification: {
          title: 'happic',
          body: '어제 떨어진 별똥별을 선물로 가져왔어!',
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: 'happic',
              body: '어제 떨어진 별똥별을 선물로 가져왔어!',
            },
          },
        },
      },
      tokens: fcmTokens,
    };

    // 푸시알림 보내기
    admin
      .messaging()
      .sendMulticast(message)
      .then(function (response: any) {
        console.log('Successfully sent message: ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postCheckNotice = async (): Promise<void> => {
  const dayjs = require('dayjs');
  try {
    const users = await User.find({});

    if (!users) {
      return null;
    }

    let fcmTokens: string[] = [];

    for (var i = 0; i < users.length; i++) {
      const userId = users[i]._id;
      let films = await Film.find({ writer: userId }).sort({ createdAt: -1 });

      const lastDate = dayjs(films[0].createdAt);
      const lastDateFormat = lastDate.format('YY-MM-DD');
      const nowDate = dayjs();
      const nowDateFormat = nowDate.format('YY-MM-DD');
      const todayPosted = lastDateFormat === nowDateFormat;
      if (todayPosted == true) {
        return;
      }

      const user = await User.find({ _id: userId }, { fcmToken: 1 });
      if (!user) {
        return null;
      }

      const fcmToken = user[0].fcmToken;

      fcmTokens.push(fcmToken);
    }

    const message = {
      android: {
        notification: {
          title: 'happic',
          body: '길잡이와 함께 해픽을 행복으로 채워보세요!',
        },
      },
      apns: {
        payload: {
          aps: {
            contentAvailable: true,
            alert: {
              title: 'happic',
              body: '길잡이와 함께 해픽을 행복으로 채워보세요!',
            },
          },
        },
      },
      tokens: fcmTokens,
    };
    // 푸시알림 보내기
    admin
      .messaging()
      .sendMulticast(message)
      .then(function (response: any) {
        console.log('Successfully sent message: ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  postCapsuleNotice,
  postCheckNotice,
};
