import mongoose from 'mongoose';

export interface UserResponseDto {
  name: String;
  email: String;
  characterId?: Number;
  characterName?: String;
  growthRate: Number;
  level: Number;
  film: mongoose.Types.ObjectId[];
  count: Number;
  fcmToken: String;
}
