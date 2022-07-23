import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import User from '../models/User';
import { KeywordInfo } from '../interfaces/keyword/KeywordInfo';
import { FilmAllResponseDto } from '../interfaces/film/FilmAllResponseDto';
import { FilmResponseDto } from '../interfaces/film/FilmResponseDto';
import { FilmTitleAllResponseDto } from '../interfaces/film/FilmTitleAllResponseDto';
import NotificationService from './NotificationService';

const getAllDaily = async (userId: string, year: string, month: string) => {
  const daily: FilmAllResponseDto[] = [];
  const dayjs = require('dayjs');

  try {
    if (year && month) {
      const films = await Film.find({
        writer: userId,
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

const getDaily = async (
  userId: string,
  filmId: string
): Promise<FilmResponseDto | null> => {
  try {
    const films = await Film.find({ writer: userId }).sort({ createdAt: -1 });
    const index = films.findIndex((x) => x.id === filmId);

    let leftFilmId;
    let rightFilmId;
    if (index > 0) {
      leftFilmId = films[index - 1].id;
    } else {
      leftFilmId = ' ';
    }

    if (index < films.length - 1) {
      rightFilmId = films[index + 1].id;
    } else {
      rightFilmId = ' ';
    }

    const film = await Film.find(
      { writer: userId, _id: filmId },
      { _id: 0, photo: 1, keyword: 1, createdAt: 1 }
    );

    const whenId = film[0].keyword[0].toString();
    const whereId = film[0].keyword[1].toString();
    const whoId = film[0].keyword[2].toString();
    const whatId = film[0].keyword[3].toString();

    const whenKeyword = await Keyword.find(
      { writer: userId, _id: whenId },
      { content: 1 }
    );
    const whereKeyword = await Keyword.find(
      { writer: userId, _id: whereId },
      { content: 1 }
    );
    const whoKeyword = await Keyword.find(
      { writer: userId, _id: whoId },
      { content: 1 }
    );
    const whatKeyword = await Keyword.find(
      { writer: userId, _id: whatId },
      { content: 1 }
    );

    const data = {
      id: filmId,
      leftId: leftFilmId,
      rightId: rightFilmId,
      date: film[0].createdAt,
      photo: film[0].photo,
      when: Number(whenKeyword[0].content),
      where: whereKeyword[0].content,
      who: whoKeyword[0].content,
      what: whatKeyword[0].content,
    };

    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

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
      {
        writer: userId,
        category: 'when',
        content: String(filmCreateDto.when),
      },
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
      const uploadedKeyword = await keyword1.save();

      keywordList.push(uploadedKeyword._id);
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

    //NotificationService.postCapsuleNotice();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteDaily = async (userId: string, filmId: string): Promise<void> => {
  try {
    const film = await Film.find(
      { writer: userId, _id: filmId },
      { _id: 0, keyword: 1 }
    );

    const whenId = film[0].keyword[0].toString();
    const whereId = film[0].keyword[1].toString();
    const whoId = film[0].keyword[2].toString();
    const whatId = film[0].keyword[3].toString();

    // #when Count - 1
    const whenKeyword = await Keyword.find(
      { writer: userId, _id: whenId },
      { _id: 0, count: 1 }
    );
    let whenCount: Number = whenKeyword[0].count;
    if ((whenCount as number) === 1) {
      await Keyword.findByIdAndDelete(whenId);
    } else {
      whenCount = (whenCount as number) - 1;
      await Keyword.findByIdAndUpdate(whenId, { count: whenCount });
    }

    // #where Count - 1
    const whereKeyword = await Keyword.find(
      { writer: userId, _id: whereId },
      { _id: 0, count: 1 }
    );
    let whereCount: Number = whereKeyword[0].count;
    if ((whereCount as number) === 1) {
      await Keyword.findByIdAndDelete(whereId);
    } else {
      whereCount = (whereCount as number) - 1;
      await Keyword.findByIdAndUpdate(whereId, { count: whereCount });
    }

    // #who Count - 1
    const whoKeyword = await Keyword.find(
      { writer: userId, _id: whoId },
      { _id: 0, count: 1 }
    );
    let whoCount: Number = whoKeyword[0].count;
    if ((whoCount as number) === 1) {
      await Keyword.findByIdAndDelete(whoId);
    } else {
      whoCount = (whoCount as number) - 1;
      await Keyword.findByIdAndUpdate(whoId, { count: whoCount });
    }

    // #what Count - 1
    const whatKeyword = await Keyword.find(
      { writer: userId, _id: whatId },
      { _id: 0, count: 1 }
    );
    let whatCount: Number = whatKeyword[0].count;
    if ((whatCount as number) === 1) {
      await Keyword.findByIdAndDelete(whatId);
    } else {
      whatCount = (whatCount as number) - 1;
      await Keyword.findByIdAndUpdate(whatId, { count: whatCount });
    }

    const user = await User.find({ _id: userId }, { count: 1 });
    let count: Number = user[0].count;
    if ((count as number) > 0) {
      count = (count as number) - 1;
    } else {
      count = 0;
    }
    await User.findByIdAndUpdate(userId, {
      count: count,
    });

    await Film.findByIdAndDelete(filmId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const postedDaily = async (userId: string): Promise<object | null> => {
  try {
    const dayjs = require('dayjs');
    const films = await Film.find({ writer: userId }).sort({ createdAt: -1 });

    var isPosted = false;

    if (!films.length) {
      return { isPosted: isPosted };
    }

    const lastDate = dayjs(films[0].createdAt);
    const lastDateFormat = lastDate.format('YY-MM-DD');

    const nowDate = dayjs();
    const nowDateFormat = nowDate.format('YY-MM-DD');

    const todayPosted = lastDateFormat === nowDateFormat;
    return { isPosted: todayPosted };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTopKeyword = async (userId: String): Promise<object> => {
  try {
    let where_keywords: KeywordInfo[] = [];
    let who_keywords: KeywordInfo[] = [];
    let what_keywords: KeywordInfo[] = [];

    const where: String[] = [];
    const who: String[] = [];
    const what: String[] = [];
    const dayjs = require('dayjs');

    where_keywords = await Keyword.find({
      writer: userId,
      category: 'where',
    }).sort({ count: -1 });
    who_keywords = await Keyword.find({ writer: userId, category: 'who' }).sort(
      { count: -1 }
    );
    what_keywords = await Keyword.find({
      writer: userId,
      category: 'what',
    }).sort({ count: -1 });

    for (var i = 0; i < 9; i++) {
      if (!where_keywords[i]) {
        break;
      } else {
        where.push(where_keywords[i].content);
      }
    }

    for (var i = 0; i < 9; i++) {
      if (!who_keywords[i]) {
        break;
      } else {
        who.push(who_keywords[i].content);
      }
    }

    for (var i = 0; i < 9; i++) {
      if (!what_keywords[i]) {
        break;
      } else {
        what.push(what_keywords[i].content);
      }
    }

    const currentDate = dayjs();

    const data = {
      currentDate,
      where,
      who,
      what,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getDayOfTheWeek = (day: Number): String => {
  if (day === 0) return '일';
  else if (day === 1) return '월';
  else if (day === 2) return '화';
  else if (day === 3) return '수';
  else if (day === 4) return '목';
  else if (day === 5) return '금';
  else if (day === 6) return '토';
};
const getAllTitle = async (userId: string, year: string, month: string) => {
  const data: FilmTitleAllResponseDto[] = [];
  const dayjs = require('dayjs');

  try {
    if (year && month) {
      const films = await Film.find({
        writer: userId,
        year: Number(year),
        month: Number(month),
      }).sort({ createdAt: -1 });

      if (films.length === 0) return data;

      for (var i = 0; i < films.length; i++) {
        let id = films[i]._id;

        let createdAt = dayjs(films[i].createdAt);
        const day = createdAt.get('date');
        const dayOfWeek = getDayOfTheWeek(createdAt.get('day'));
        const photo = films[i].photo;
        const thumbnail = films[i].photo;
        const whenId = films[i].keyword[0].toString();
        const whereId = films[i].keyword[1].toString();
        const whoId = films[i].keyword[2].toString();
        const whatId = films[i].keyword[3].toString();

        const whenKeyword = await Keyword.find(
          { writer: userId, _id: whenId },
          { content: 1 }
        );
        const whereKeyword = await Keyword.find(
          { writer: userId, _id: whereId },
          { content: 1 }
        );
        const whoKeyword = await Keyword.find(
          { writer: userId, _id: whoId },
          { content: 1 }
        );
        const whatKeyword = await Keyword.find(
          { writer: userId, _id: whatId },
          { content: 1 }
        );

        data.push({
          id: id,
          day: day,
          dayOfWeek: dayOfWeek,
          photo: photo,
          thumbnail: thumbnail,
          when: whenKeyword.length ? Number(whenKeyword[0].content) : 12,
          where: whereKeyword.length ? whereKeyword[0].content : '홍대',
          who: whoKeyword.length ? whoKeyword[0].content : '엄마',
          what: whatKeyword.length ? whatKeyword[0].content : '배고파',
        });
      }
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createDaily,
  deleteDaily,
  getAllDaily,
  postedDaily,
  getTopKeyword,
  getAllTitle,
  getDaily,
};
