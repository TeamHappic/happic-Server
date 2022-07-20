import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const SignUpSchema = new mongoose.Schema({
  characterId: {
    type: Number,
    required: true,
  },
  characterName: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true
  }
});

export default mongoose.model<UserInfo & mongoose.Document>('SignUp', SignUpSchema);
