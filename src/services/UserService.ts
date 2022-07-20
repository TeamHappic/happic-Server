import User from '../models/User';
import { logger } from '../config/winstonConfig';
import { authStrategy } from './SocialAuthStrategy';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import Film from '../models/Film';

const isSameDate = (date1: Date) => {
  const today = new Date();
  return (
    date1.getFullYear() === today.getFullYear() &&
    date1.getMonth() === today.getMonth() &&
    date1.getDate() === today.getDate()
  );
};

const findCharacter = async (
  userId: string
): Promise<UserResponseDto | null> => {
  try {
    const user = await User.findById(userId).populate('film', 'createAt');

    if (!user) {
      return null;
    }

    const film = await Film.findById(user.film[0]);
    var isPosted = false;
    if (film) {
      isPosted = isSameDate(film.createdAt);
    }

    const data = {
      characterId: user.characterId,
      characterName: user.characterName,
      growthRate: user.growthRate,
      level: user.level,
      isPosted: isPosted,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export type SocialPlatform = 'kakao';

//로그인
const signIn = async (social: SocialPlatform,  accessToken: string) => {
  try{
      // const signup = new SignUp({
      //     characterId: userCreateDto.characterId,
      //     characterName: userCreateDto.characterName,
      //     accesToken: userCreateDto.accessToken
      // });

      const user = await authStrategy[social].execute(accessToken);
      return user;
  // await signup.save();

  // const data = {
  //   id: signup.id,
  // };

  // return data;
  } catch (error) {
    logger.e(error);
    throw error;
  }
};


// const signinUser = async (socialId: string, email: string) => {

//   try {
//     const signup = new SignUp({
//       socialId: socialId,
//       email: email,
//     });

//     await signup.save();

//     return signup;
//   } catch (error) {
//     logger.e(error);
//     throw error;
//   }
// };

// const loginUser = async (accessToken: string) => {
//   try {
//     const user = await authStrategy[social].execute(accessToken);
//     return user;
//   } catch (error) {
//     logger.e(error);
//     throw error;
//   }
// };

const findUserById = async (accessToken: string) => {
  try {
    console.log("before user check");
    const user = await User.findOne({
      accessToken: accessToken
    });
    console.log(user);
    return user;
  } catch (error) {
    logger.e(error);
    throw error;
  }
};
//회원가입
const signUp = async(
  //social: string,
  // socialId: string,
  //email: string
  characterId: number,
  characterName: string,
  accessToken: string
) => {
  try {
    let user;
    //if (!email) {
      user = new User({
        name: `해픽${characterId}`,
        //social: social,
        characterId: characterId,
        characterName: characterName,
        accessToken: accessToken
      });
    // } else {
    //   user = new User({
    //     name: `해픽${socialId}`,
    //     social: social,
    //     socialId: socialId,
    //     email: email,
    //   });
    // }
    await user.save();

    return user;
    }catch (error){
      logger.e("", error);
      throw error;
    }
};

export default {
  signUp,
  signIn,
  findUserById,
  findCharacter
};
