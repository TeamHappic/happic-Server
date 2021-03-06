import User from '../models/User';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import Film from '../models/Film';
import { FilmResponseDto } from '../interfaces/film/FilmResponseDto';
import Keyword from '../models/Keyword';
import NotificationService from './NotificationService';

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
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    const tempFilm = await Film.find({writer:userId}).sort({createdAt:-1});

    var isPosted = false;
    if (tempFilm.length) {
      isPosted = isSameDate(tempFilm[0].createdAt);
    }

    const data = {
      characterId: user.characterId,
      characterName: user.characterName,
      growthRate: user.growthRate,
      growth_rate: user.growthRate,
      level: user.level,
      isPosted: isPosted,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRandomCapsule = async (userId: string): Promise<object | null> => {
  try {
    const films = await Film.find({ writer: userId });
    const filmsNum = films.length;
    const randomFilmIndex = Math.floor(Math.random() * filmsNum);
    const randomFilm = films[randomFilmIndex];

    
    const whenId = randomFilm.keyword[0].toString();
    const whereId = randomFilm.keyword[1].toString();
    const whoId = randomFilm.keyword[2].toString();
    const whatId = randomFilm.keyword[3].toString();

    const whenKeyword = await Keyword.find({ writer: userId, _id: whenId });
    const whereKeyword = await Keyword.find({ writer: userId, _id: whereId });
    const whoKeyword = await Keyword.find({ writer: userId, _id: whoId });
    const whatKeyword = await Keyword.find({ writer: userId, _id: whatId });

    const data = {
      date: randomFilm.createdAt,
      photo: randomFilm.photo,
      when: Number(whenKeyword[0].content),
      where: whereKeyword[0].content,
      who: whoKeyword[0].content,
      what: whatKeyword[0].content,
    };

    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const capsulePushAlram = () => {
// NotificationService.postCapsuleNotice();
// return 0;
// };
// const checkPushAlaram = () => {
//   NotificationService.postCheckNotice();
// };

export default {
  findCharacter,
  getRandomCapsule,
  //capsulePushAlram,
  // checkPushAlaram,
};
