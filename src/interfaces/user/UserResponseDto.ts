import mongoose from 'mongoose';

export interface UserResponseDto {
  characterId: Number;
  characterName: String;
  growthRate: Number;
  level: Number;
}
