import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import User from '../models/User';

const createDaily = async (
  userId: string,
  filmCreateDto: FilmCreateDto
): Promise<PostBaseResponseDto> => {
  try {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월

    const keywordList: String[] = [];

    // #when 저장
    const whenKeyword = await Keyword.find(
      { writer: userId, category: 'when', content: filmCreateDto.when },
      { count: 1 }
    );

    if (whenKeyword.length === 0) {
      const keyword1 = new Keyword({
        writer: userId,
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
      keywordList.push(whenKeyword[0]._id);
    }

    // # where 저장
    const whereKeyword = await Keyword.find(
      { writer: userId, category: 'where', content: filmCreateDto.where },
      { count: 1 }
    );

    if (whereKeyword.length === 0) {
      const keyword2 = new Keyword({
        writer: userId,
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
      keywordList.push(whereKeyword[0]._id);
    }

    // # who 저장
    const whoKeyword = await Keyword.find(
      { writer: userId, category: 'who', content: filmCreateDto.who },
      { count: 1 }
    );
    if (whoKeyword.length === 0) {
      const keyword3 = new Keyword({
        writer: userId,
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
      keywordList.push(whoKeyword[0]._id);
    }

    // # what 저장
    const whatKeyword = await Keyword.find(
      { writer: userId, category: 'what', content: filmCreateDto.what },
      { count: 1 }
    );
    if (whatKeyword.length === 0) {
      const keyword4 = new Keyword({
        writer: userId,
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
      keywordList.push(whatKeyword[0]._id);
    }

    // 유저 업데이트
    const user = await User.find(
      { _id: userId },
      { count: 1, growthRate: 1, level: 1 }
    );

    let count: Number = user[0].count;
    let growthRate: Number = user[0].growthRate;
    let level: Number = user[0].level;

    count = (count as number) + 1;
    growthRate = (growthRate as number) + 1;
    if (growthRate === 6) {
      level = (level as number) + 1;
      growthRate = 0;
    }

    await User.findByIdAndUpdate(userId, {
      count: count,
      growthRate: growthRate,
      level: level,
    });

    // 필름 생성
    const film = new Film({
      writer: userId,
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
