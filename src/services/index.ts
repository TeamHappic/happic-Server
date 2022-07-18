import UserService from './UserService';
import MypageService from './MypageService';
import DailyService from './DailyService';
import FileService from './FileService';
import CharService from './CharService';

//service index file
export { UserService, MypageService, FileService, DailyService, CharService };

export function getUser(social: any, token: any) {
    throw new Error("Function not implemented.");
}