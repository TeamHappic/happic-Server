import User from '../models/User';

const changeChar = async (
  userId: string,
  characterId: number,
  characterName: string
) => {
  try {
    await User.findByIdAndUpdate(userId, {
      characterId: characterId,
      characterName: characterName,
      growthRate: 0,
      level: 1,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  changeChar,
};
