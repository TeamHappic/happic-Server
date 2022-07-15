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

    const { photo, when, where, who, what } = filmCreateDto;

    const keyword1 = new Keyword({
      category: 'when',
      content: when,
      year: year,
      month: month,
    });
    await keyword1.save();

    const keyword2 = new Keyword({
      category: 'where',
      content: where,
      year: year,
      month: month,
    });
    await keyword2.save();

    const keyword3 = new Keyword({
      category: 'who',
      content: who,
      year: year,
      month: month,
    });
    await keyword3.save();

    const keyword4 = new Keyword({
      category: 'what',
      content: what,
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
      photo: photo,
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
