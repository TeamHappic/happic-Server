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
    whenCount = (whenCount as number) - 1;
    await Keyword.findByIdAndUpdate(whenId, { count: whenCount });

    // #where Count - 1
    const whereKeyword = await Keyword.find(
      { _id: whereId },
      { _id: 0, count: 1 }
    );
    let whereCount: Number = whereKeyword[0].count;
    whereCount = (whereCount as number) - 1;
    await Keyword.findByIdAndUpdate(whereId, { count: whereCount });

    // #who Count - 1
    const whoKeyword = await Keyword.find({ _id: whoId }, { _id: 0, count: 1 });
    let whoCount: Number = whoKeyword[0].count;
    whoCount = (whoCount as number) - 1;
    await Keyword.findByIdAndUpdate(whoId, { count: whoCount });
    console.log(await Keyword.find({ _id: whoId }, { _id: 0, count: 1 }));

    // #what Count - 1
    const whatKeyword = await Keyword.find(
      { _id: whatId },
      { _id: 0, count: 1 }
    );
    let whatCount: Number = whatKeyword[0].count;
    whatCount = (whatCount as number) - 1;
    await Keyword.findByIdAndUpdate(whatId, { count: whatCount });
    console.log(await Keyword.find({ _id: whenId }, { _id: 0, count: 1 }));

    await Film.findByIdAndDelete(filmId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createDaily,
  deleteDaily,
};
