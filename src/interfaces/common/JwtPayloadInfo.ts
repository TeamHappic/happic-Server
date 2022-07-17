import mongoose from 'mongoose';

// JWT token 객체 안에 담아서 보내 줄 정보
export interface JwtPayloadInfo {
  user: {
    id: mongoose.Schema.Types.ObjectId;
  };
}
