import mongoose from 'mongoose';
import config from '../config';
import File from '../models/File';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import User from '../models/User';
import admin from 'firebase-admin';
let serviceAccount = require('../../firebase-admin.json');

const firebaseKeys = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

const connectDB = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKeys),
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
