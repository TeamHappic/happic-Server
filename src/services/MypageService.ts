import { FilmInfo } from '../interfaces/film/FilmInfo';
import { KeywordInfo } from '../interfaces/keyword/KeywordInfo';
import { KeywordOptionType } from '../interfaces/keyword/KeywordOptionType';
import { KeywordResponseDto } from '../interfaces/keyword/KeywordResponseDto';
import { UserInfo } from '../interfaces/user/UserInfo';
import Film from '../models/Film';
import Keyword from '../models/Keyword';
import dayjs from 'dayjs';

const getCategoryRank = async (
  userId: String,
  year: Number,
  month: Number,
  option: String,
  rankNum: Number
): Promise<Array<object>> => {
  let keywords: KeywordInfo[] = [];
  let rank3s_1 = [];
  let films: FilmInfo[] = [];
  let images: String[] = [];

  if (option==='when'){    
    option = 'when'||'how';
  }

  if (option==='how'){    
    option = 'when'||'how';
  }

  keywords = await Keyword.find({
    writer: userId,
    year: year,
    month: month,
    category: option,
  }).sort({ count: -1 });
  for (var i = 0; i < rankNum; i++) {
    // 키워드는 4개만 보여줌
    if (keywords[i]) {
      // keywords[i]로 작성된 film 검색
      films = await Film.find({ writer: userId, keyword: keywords[i] }).sort({
        count: -1,
      });
      for (var j = 0; j < 3; j++) {
        if (films[j]) {
          images.push(films[j].photo);
        } // 추후에 thumbnail로 바꾸기
      }
      const temp = {
        content: keywords[i].content,
        images: images,
        count: keywords[i].count,
      };
      rank3s_1.push(temp);
      images = [];
    }
  }
  return rank3s_1;
};

const getAllRank = async (
  userId: String,
  year: Number,
  month: Number
): Promise<object> => {
  let keywords: KeywordInfo[] = [];
  let films: FilmInfo[] = [];
  let rank1s: Array<object> = [];
  let rank2s: Array<object> = [];
  let rank3s: object = {};
  let rank4s: object = {};
  try {
    if (year && month) {
      //rank1
      let when_keywords: KeywordInfo[] = [];
      let where_keywords: KeywordInfo[] = [];
      let who_keywords: KeywordInfo[] = [];
      let what_keywords: KeywordInfo[] = [];

      when_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
        category: 'when',
      }).sort({ count: -1 });
      if (when_keywords.length !== 0) {
        rank1s.push({ content: when_keywords[0].content });
      }
      where_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
        category: 'where',
      }).sort({ count: -1 });
      if (where_keywords.length !== 0) {
        rank1s.push({ content: where_keywords[0].content });
      }
      who_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
        category: 'who',
      }).sort({ count: -1 });
      if (who_keywords.length !== 0) {
        rank1s.push({ content: who_keywords[0].content });
      }
      what_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
        category: 'what',
      }).sort({ count: -1 });
      if (what_keywords.length !== 0) {
        rank1s.push({ content: what_keywords[0].content });
      }

      //rank2
      let all_keywords: KeywordInfo[] = [];
      all_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
      }).sort({ count: -1 });
      for (var i = 0; i < 4; i++) {
        if (all_keywords[i]) {
          rank2s.push({
            content: all_keywords[i].content,
            category: all_keywords[i].category,
            count: all_keywords[i].count,
          });
        }
      }

      // rank3
      const rank3s_when = await getCategoryRank(userId, year, month, 'when', 4);
      const rank3s_where = await getCategoryRank(
        userId,
        year,
        month,
        'where',
        4
      );
      const rank3s_who = await getCategoryRank(userId, year, month, 'who', 4);
      const rank3s_what = await getCategoryRank(userId, year, month, 'what', 4);
      rank3s = {
        when: rank3s_when,
        where: rank3s_where,
        who: rank3s_who,
        what: rank3s_what,
      };
      // rank4
      films = await Film.find({ writer: userId, year: year, month: month });
      rank4s = { month: month, count: films.length };
    }

    const data = {
      rank1s,
      rank2s,
      rank3s,
      rank4s,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getKeywordRank = async (
  userId: String,
  year: Number,
  month: Number
): Promise<object> => {
  let keywords: KeywordInfo[] = [];
  let films: FilmInfo[] = [];
  let data: Array<object> = [];
  try {
    if (year && month) {
      //rank2
      let all_keywords: KeywordInfo[] = [];
      all_keywords = await Keyword.find({
        writer: userId,
        year: year,
        month: month,
      }).sort({ count: -1 });
      for (var i = 0; i < 8; i++) {
        if (all_keywords[i]) {
          data.push({
            content: all_keywords[i].content,
            category: all_keywords[i].category,
            count: all_keywords[i].count,
          });
        }
      }
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getKeywordByCategory = async (
  userId: String,
  year: Number,
  month: Number,
  option: KeywordOptionType
): Promise<object> => {
  let keywords: KeywordInfo[] = [];
  let films: FilmInfo[] = [];
  let data: Array<object> = [];
  try {
    if (year && month && option) {
      // rank3
      let images: String[] = [];
      data = await getCategoryRank(userId, year, month, option, 8);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getKeywordByMonth = async (
  userId: String,
  year: Number,
  month: Number
): Promise<object> => {
  let films: FilmInfo[] = [];
  let ranks: object = [];
  let filmDates: Number[] = [];
  try {
    if (year && month) {
      films = await Film.find({ writer: userId, year: year, month: month });
      for (var i = 0; i < films.length; i++) {
        var day = dayjs(films[i].createdAt);
        filmDates.push(day.get('date'));
      }
      //ranks.push({ month: month, count: films.length, dates: filmDates });
    }

    const data = { month: month, count: films.length, dates: filmDates };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getAllRank,
  getKeywordRank,
  getKeywordByCategory,
  getKeywordByMonth,
};
