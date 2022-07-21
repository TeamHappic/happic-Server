import mongoose from 'mongoose';
import config from '../config';
import File from '../models/File';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import User from '../models/User';
import * as admin from 'firebase-admin';

var serviceAccount = require('../../firebase-admin.json');

const connectDB = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });

    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    User.createCollection().then(function (collection) {
      console.log('User Collection is created!');
    });

    File.createCollection().then(function (collection) {
      console.log('File Collection is created!');
    });

    Film.createCollection().then(function (collection) {
      console.log('Film Collection is created!');
    });

    Keyword.createCollection().then(function (collection) {
      console.log('Keyword Collection is created!');
    });

    console.log('Mongoose Connected ...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
