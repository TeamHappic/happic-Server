import { UserInfo } from '../user/UserInfo';
import mongoose from 'mongoose';

export interface KeywordResponseDto {
  writer: UserInfo;
  category: String;
  content: String;
  count: Number;
  year: Number;
  month: Number;
}
