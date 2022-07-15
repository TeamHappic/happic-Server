import mongoose from 'mongoose';

export interface KeywordInfo {
  writer: mongoose.Types.ObjectId;
  category: String;
  content: String;
  count: Number;
  year: Number;
  month: Number;
}
