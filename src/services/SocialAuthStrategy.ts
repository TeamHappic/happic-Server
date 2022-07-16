import auth from "../config/auth";
import {SocialPlatform} from "./UserService";

export interface SocialAuthStrategy{
    execute(accessToken: string): Promise<any>;
}

class KakaoAuthStrategy implements SocialAuthStrategy {
    execute(accessToken: string): Promise<any> {
        return auth.kakaoAuth(accessToken);
    }
}

type AuthType = {
    [social in SocialPlatform]: SocialAuthStrategy;
};

export const authStrategy: AuthType ={
    kakao: new KakaoAuthStrategy()
}
