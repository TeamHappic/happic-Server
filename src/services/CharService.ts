import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { CharCreateDto } from "../interfaces/user/CharCreateDto";
import Char from "../models/Char";

const createChar = async (charCreateDto: CharCreateDto): Promise<PostBaseResponseDto> => {
    try{
        const char = new Char({
            characterId: charCreateDto.characterId,
            characterName: charCreateDto.characterName
        });

    await char.save();
    const data = {
      id: char.id,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createChar,
};
