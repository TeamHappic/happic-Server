import { PostBaseResponseDto } from '../interfaces/common/postBaseResponseDto';
import { FilmCreateDto } from '../interfaces/film/FilmCreateDto';
import { FilmInfo } from '../interfaces/film/FilmInfo';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import dayjs from 'dayjs';
import { KeywordInfo } from '../interfaces/keyword/KeywordInfo';
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
        let thumbnail = films[i].thumbnail;
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
    if ((whenCount as number) === 1) {
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
    if ((whereCount as number) === 1) {
      await Keyword.findByIdAndDelete(whereId);
    } else {
      whereCount = (whereCount as number) - 1;
      await Keyword.findByIdAndUpdate(whereId, { count: whereCount });
    }

    // #who Count - 1
    const whoKeyword = await Keyword.find({ _id: whoId }, { _id: 0, count: 1 });
    let whoCount: Number = whoKeyword[0].count;
    if ((whoCount as number) === 1) {
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
    if ((whatCount as number) === 1) {
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

const postedDaily = async (
  userId: string,
): Promise<object|null> => {
  try {
    const films = await Film.find({writer:userId}).sort({createAt:-1});
    
    var isPosted = false

    if (!films) {
      return {isPosted: isPosted};
    }
  
    const lastDate = dayjs(films[0].createdAt);
    const lastDateFormat = lastDate.format("YY-MM-DD");

    const nowDate = dayjs();
    const nowDateFormat = nowDate.format("YY-MM-DD");

    const todayPosted = (lastDateFormat === nowDateFormat)
    return {isPosted:todayPosted };

  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTopKeyword = async (
  userId: String,
): Promise<object> => {

  try {
    let where_keywords: KeywordInfo[] = [];
    let who_keywords: KeywordInfo[] = [];
    let what_keywords: KeywordInfo[] = [];

    const where: String[] =[];
    const who: String[] =[];
    const what: String[] =[];

    where_keywords = await Keyword.find({writer:userId,category:'where'}).sort({count:-1});
    who_keywords = await Keyword.find({writer:userId,category:'who'}).sort({count:-1});
    what_keywords = await Keyword.find({writer:userId,category:'what'}).sort({count:-1});

    for(var i =0;i<9;i++){
      if(!where_keywords[i]){
        break;
      }
      else{
        where.push(where_keywords[i].content);
      }
    }

    for(var i =0;i<9;i++){
      if(!who_keywords[i]){
        break;
      }
      else{
        who.push(who_keywords[i].content);
      }
    }

    for(var i =0;i<9;i++){
      if(!what_keywords[i]){
        break;
      }
      else{
        what.push(what_keywords[i].content);
      }
    }

    const currentDate = dayjs();

    const data = {
      currentDate,
      where,
      who,
      what
    };

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
};
function dayjs(createdAt: Date) {
  throw new Error('Function not implemented.');
}
