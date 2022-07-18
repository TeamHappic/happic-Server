import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import { FilmInfo } from '../interfaces/film/FilmInfo';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import { FilmResponseDto } from '../interfaces/film/FilmResponseDto';

const getAllDaily = async (year: string, month: string) => {
  const daily: FilmResponseDto[] = [];
  const dayjs = require('dayjs');

  try {
    if (year && month) {
      const films = await Film.find({
        year: Number(year),
        month: Number(month),
      });
      if (films.length === 0) return null;

      for (var i = 0; i < films.length; i++) {
        let id = films[i]._id;
        let thumbnail = films[i].photo;
        let createdAt = dayjs(films[i].createdAt);
        const day = createdAt.get('date');

        daily.push({ id, day, thumbnail });
      }
      return daily;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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

const deleteDaily = async (filmId: string): Promise<void> => {
  try {
    const film = await Film.find({ _id: filmId }, { _id: 0, keyword: 1 });

    const whenId = film[0].keyword[0].toString();
    const whereId = film[0].keyword[1].toString();
    const whoId = film[0].keyword[2].toString();
    const whatId = film[0].keyword[3].toString();

    // #when Count - 1
    const whenKeyword = await Keyword.find(
      { _id: whenId },
      { _id: 0, count: 1 }
    );
    let whenCount: Number = whenKeyword[0].count;
    if (whenCount === 0) {
      await Keyword.findByIdAndDelete(whenId);
    } else {
      whenCount = (whenCount as number) - 1;
      await Keyword.findByIdAndUpdate(whenId, { count: whenCount });
    }

    // #where Count - 1
    const whereKeyword = await Keyword.find(
      { _id: whereId },
      { _id: 0, count: 1 }
    );
    let whereCount: Number = whereKeyword[0].count;
    if (whereCount === 0) {
      await Keyword.findByIdAndDelete(whereId);
    } else {
      whereCount = (whereCount as number) - 1;
      await Keyword.findByIdAndUpdate(whereId, { count: whereCount });
    }

    // #who Count - 1
    const whoKeyword = await Keyword.find({ _id: whoId }, { _id: 0, count: 1 });
    let whoCount: Number = whoKeyword[0].count;
    if (whoCount === 0) {
      await Keyword.findByIdAndDelete(whoId);
    } else {
      whoCount = (whoCount as number) - 1;
      await Keyword.findByIdAndUpdate(whoId, { count: whoCount });
    }

    // #what Count - 1
    const whatKeyword = await Keyword.find(
      { _id: whatId },
      { _id: 0, count: 1 }
    );
    let whatCount: Number = whatKeyword[0].count;
    if (whatCount === 0) {
      await Keyword.findByIdAndDelete(whatId);
    } else {
      whatCount = (whatCount as number) - 1;
      await Keyword.findByIdAndUpdate(whatId, { count: whatCount });
    }

    await Film.findByIdAndDelete(filmId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createDaily,
  deleteDaily,
  getAllDaily,
};
function dayjs(createdAt: Date) {
  throw new Error('Function not implemented.');
}
