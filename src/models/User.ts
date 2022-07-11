import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  characterName: {
    type: String,
    require: true,
  },
  growthRate: {
    type: Number,
    required: true,
  },
  level: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Character',
  },
  character: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Character',
  },
  film: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Film',
    },
  ],
  fcmToken: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
