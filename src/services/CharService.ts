import { CharCreateDto } from "../interfaces/user/CharCreateDto";
import Char from "../models/Char";

const createChar = async (charCreateDto: CharCreateDto) => {
    try{
        const char = new Char({
            characterId: charCreateDto.characterId,
            characterName: charCreateDto.characterName
        });

        await char.save();
        
       
    }catch (error){
        console.log(error);
        throw error;
    }
}

export default{
    createChar
}