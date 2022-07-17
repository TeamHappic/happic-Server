import { FilmInfo } from '../interfaces/film/FilmInfo';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import Film from '../models/Film';
import User from '../models/User';

const isSameDate = (date1: Date) => {
  const today = new Date();
  return (
    date1.getFullYear() === today.getFullYear() &&
    date1.getMonth() === today.getMonth() &&
    date1.getDate() === today.getDate()
  );
};

const findUserById = async (
  userId: string
): Promise<UserResponseDto | null> => {
  try {
    const user = await User.findById(userId).populate('film', 'createAt');

    if (!user) {
      return null;
    }
    
    const film = await Film.findById(user.film[0])
    var isPosted = false
    if (film){
        isPosted = isSameDate(film.createdAt)
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

export default {
  findUserById,
};
