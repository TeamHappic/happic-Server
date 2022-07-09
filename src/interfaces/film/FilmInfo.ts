import mongoose from 'mongoose';

export interface CharacterInfo {
  writer: mongoose.Types.ObjectId;
  photo: String;
  keyword: mongoose.Types.ObjectId[];
}
