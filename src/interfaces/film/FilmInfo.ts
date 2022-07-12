import mongoose from 'mongoose';

export interface FilmInfo {
  writer: mongoose.Types.ObjectId;
  photo: String;
  thumbnail: String;
  keyword: mongoose.Types.ObjectId[];
}
