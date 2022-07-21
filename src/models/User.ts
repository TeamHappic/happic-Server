import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  social: {
    type: String,
    //required: true,
  },
  socialId: {
    type: String,
    unique: true,
  },
  characterId: {
    type: Number,
  },
  characterName: {
    type: String,
  },
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
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  accessToken: {
    type: String,
    required: true,
  },
  fcmToken: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
