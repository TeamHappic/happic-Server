import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import { FilmInfo } from '../interfaces/film/FilmInfo';
import Film from '../models/Film';
import Keyword from '../models/Keyword';

const createDaily = async (
  filmCreateDto: FilmCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월

    const keywordList: String[] = [];

    // #when 저장
    const whenKeyword = await Keyword.find(
      { category: 'when', content: filmCreateDto.when },
      { count: 1 }
    );

    if (whenKeyword.length === 0) {
      const keyword1 = new Keyword({
        writer: '62cef0997f008c29128704ed',
        category: 'when',
        content: filmCreateDto.when,
        year: year,
        month: month,
        count: 1,
      });
      await keyword1.save();

      keywordList.push(keyword1._id);
    } else {
      let whenCount: Number = whenKeyword[0].count;

      whenCount = (whenCount as number) + 1;
      await Keyword.findByIdAndUpdate(whenKeyword[0]._id, { count: whenCount });
    }

    // # where 저장
    const whereKeyword = await Keyword.find(
      { category: 'where', content: filmCreateDto.where },
      { count: 1 }
    );

    if (whereKeyword.length === 0) {
      const keyword2 = new Keyword({
        writer: '62cef0997f008c29128704ed',
        category: 'where',
        content: filmCreateDto.where,
        year: year,
        month: month,
        count: 1,
      });
      await keyword2.save();

      keywordList.push(keyword2._id);
    } else {
      let whereCount: Number = whereKeyword[0].count;
      whereCount = (whereCount as number) + 1;
      await Keyword.findByIdAndUpdate(whenKeyword[0]._id, {
        count: whereCount,
      });
    }

    // # who 저장
    const whoKeyword = await Keyword.find(
      { category: 'who', content: filmCreateDto.who },
      { count: 1 }
    );
    if (whoKeyword.length === 0) {
      const keyword3 = new Keyword({
        writer: '62cef0997f008c29128704ed',
        category: 'who',
        content: filmCreateDto.who,
        year: year,
        month: month,
        count: 1,
      });
      await keyword3.save();
      keywordList.push(keyword3._id);
    } else {
      let whoCount: Number = whoKeyword[0].count;
      whoCount = (whoCount as number) + 1;
      await Keyword.findByIdAndUpdate(whoKeyword[0]._id, {
        count: whoCount,
      });
    }

    // # what 저장
    const whatKeyword = await Keyword.find(
      { category: 'what', content: filmCreateDto.what },
      { count: 1 }
    );
    if (whatKeyword.length === 0) {
      const keyword4 = new Keyword({
        writer: '62cef0997f008c29128704ed',
        category: 'what',
        content: filmCreateDto.what,
        year: year,
        month: month,
        count: 1,
      });
      await keyword4.save();
      keywordList.push(keyword4._id);
    } else {
      let whatCount: Number = whatKeyword[0].count;
      whatCount = (whatCount as number) + 1;
      await Keyword.findByIdAndUpdate(whatKeyword[0]._id, {
        count: whatCount,
      });
    }

    const film = new Film({
      writer: '62cef0997f008c29128704ed',
      photo: filmCreateDto.photo,
      keyword: keywordList,
      year: year,
      month: month,
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
