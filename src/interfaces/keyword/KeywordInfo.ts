import mongoose from 'mongoose';

export interface KeywordInfo {
  writer: mongoose.Types.ObjectId;
  category: String;
  content: String;
  year: Number;
  month: Number;
  count: Number;
}
