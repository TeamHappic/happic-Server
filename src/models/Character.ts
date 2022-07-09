import mongoose from 'mongoose';
import { CharacterInfo } from '../interfaces/character/CharacterInfo';

const CharacterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    talk: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    createPost: {
      type: String,
      required: true,
    },
    push: [
      {
        type: String,
        required: true,
      },
    ],
    levelNames: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true, // createdAt, updatedAt 자동기록
  }
);

export default mongoose.model<CharacterInfo & mongoose.Document>(
  'Character',
  CharacterSchema
);
