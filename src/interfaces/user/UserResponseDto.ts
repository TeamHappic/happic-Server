import mongoose from 'mongoose';

export interface UserResponseDto {
  characterId: Number|undefined;
  characterName: String|undefined;
  growthRate: Number;
  level: Number;
}
