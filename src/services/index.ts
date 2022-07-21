import UserService from './UserService';
import MypageService from './MypageService';
import DailyService from './DailyService';
import FileService from './FileService';
import SettingService from './SettingService';

//service index file
export {
  UserService,
  MypageService,
  FileService,
  DailyService,
  SettingService,
};

export function getUser(social: any, token: any) {
  throw new Error('Function not implemented.');
}
