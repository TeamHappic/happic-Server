import mongoose from 'mongoose';
import { KeywordInfo } from '../interfaces/keword/KeywordInfo';

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
      require: true,
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
  'Keword',
  KeywordSchema
);
