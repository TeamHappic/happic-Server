import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  social: {
    type: String,
    required: true,
    unique: true,
  },
  socialId:{
    type: String,
    required: true,
    unique: true
  },
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // characterId: {
  //   type: Number,
  //   required: true,
  // },
  // characterName: {
  //   type: String,
  //   required: true,
  // },
  growthRate: {
    type: Number,
    required: true,
    default: 0,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  film: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Film',
    },
  ],
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  // fcmToken: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
