import mongoose from 'mongoose';

export interface FileResponseDto {
  id: mongoose.Schema.Types.ObjectId;
  link: string;
}
