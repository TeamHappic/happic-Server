import mongoose from 'mongoose';
import { KeywordInfo } from '../interfaces/keyword/KeywordInfo';

const KeywordSchema = new mongoose.Schema(
  {
    writer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동기록
  }
);

export default mongoose.model<KeywordInfo & mongoose.Document>(
  'Keyword',
  KeywordSchema
);
