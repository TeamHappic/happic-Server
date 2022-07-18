import mongoose from 'mongoose';

export interface FilmInfo {
  id: String;
  writer: mongoose.Types.ObjectId;
  photo: String;
  thumbnail: String;
  keyword: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
