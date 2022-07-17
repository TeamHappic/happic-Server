import mongoose from 'mongoose';

export interface UserInfo {
  name: string;
  social: string;
  socialId: string;
  email: string;
  characterId?: Number;
  characterName?: string;
  growthRate: Number;
  level: Number;
  film: mongoose.Types.ObjectId[];
  count: Number;
  fcmToken: string;
  refreshToken: string;
}
