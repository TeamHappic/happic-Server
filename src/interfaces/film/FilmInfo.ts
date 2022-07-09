import mongoose from 'mongoose';

export interface FilmInfo {
  writer: mongoose.Types.ObjectId;
  photo: String;
  keyword: mongoose.Types.ObjectId[];
}
