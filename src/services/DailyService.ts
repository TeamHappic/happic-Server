import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import Film from '../models/Film';
import Keyword from '../models/Keyword';

const createDaily = async (
  filmCreateDto: FilmCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월

    // #when 저장
    const keyword1 = new Keyword({
      writer: '62cef0997f008c29128704ed',
      category: 'when',
      content: filmCreateDto.when,
      year: year,
      month: month,
    });
    await keyword1.save();

    // # where 저장
    const keyword2 = new Keyword({
      writer: '62cef0997f008c29128704ed',
      category: 'where',
      content: filmCreateDto.where,
      year: year,
      month: month,
    });
    await keyword2.save();

    // # who 저장
    const keyword3 = new Keyword({
      writer: '62cef0997f008c29128704ed',
      category: 'who',
      content: filmCreateDto.who,
      year: year,
      month: month,
    });
    await keyword3.save();

    // # what 저장
    const keyword4 = new Keyword({
      writer: '62cef0997f008c29128704ed',
      category: 'what',
      content: filmCreateDto.what,
      year: year,
      month: month,
    });
    await keyword4.save();

    const keywordList = [
      keyword1._id,
      keyword2._id,
      keyword3._id,
      keyword4._id,
    ];

    const film = new Film({
      writer: '62cef0997f008c29128704ed',
      photo: filmCreateDto.photo,
      keyword: keywordList,
    });

    await film.save();

    const data = {
      id: film._id,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createDaily,
};
