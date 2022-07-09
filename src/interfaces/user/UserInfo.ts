import mongoose from 'mongoose';

export interface UserInfo {
  name: String;
  email: String;
  characterName: String;
  growthRate: Number;
  level: Number;
  character: mongoose.Types.ObjectId;
  film: mongoose.Types.ObjectId[];
}
