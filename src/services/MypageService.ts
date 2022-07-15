import { FilmInfo } from "../interfaces/film/FilmInfo";
import { KeywordInfo } from "../interfaces/keyword/KeywordInfo";
import { KeywordOptionType } from "../interfaces/keyword/KeywordOptionType";
import { KeywordResponseDto } from "../interfaces/keyword/KeywordResponseDto";
import { UserInfo } from "../interfaces/user/UserInfo";
import Film from "../models/Film";
import Keyword from "../models/Keyword";

const getCategoryRank = async( 
    userId : String,
    year : Number,
    month : Number,
    option:  String,
    rankNum: Number,): Promise<Array<object>> => {

    let keywords: KeywordInfo[] = [];
    let rank3s_1 = [];
    let films: FilmInfo[] =[];
    let images: String[] = [];

    keywords = await Keyword.find({ writer:userId, year:year, month:month, category:option }).sort({ count: -1 }) 
    for (var i = 0; i < rankNum; i++){ // 키워드는 4개만 보여줌
        if(keywords[i]){
            // keywords[i]로 작성된 film 검색
            films = await Film.find({ writer:userId, keyword:keywords[i]});
            for (var j = 0; j<3; j++){
                if(films[j]){
                    images.push(films[j].photo) ;
                }// 추후에 thumbnail로 바꾸기
            }
            const temp = {content:keywords[i].content,images:images};
            rank3s_1.push(temp);
            images = [];
        }
    }
    return rank3s_1
}

const getAllRank = async (
    userId : String,
    year : Number,
    month : Number,
    option:  KeywordOptionType,
): Promise<object> => {

    let keywords: KeywordInfo[] = [];
    let films: FilmInfo[] = [];
    let rank1s: Array<object> = [];
    let rank2s: Array<object> = [];
    let rank3s: Array<object> = [];
    let rank4s: Array<object> = [];
    try {
        if (year && month) {
            //rank1
            let when_keywords: KeywordInfo[] = [];
            let where_keywords: KeywordInfo[] = [];
            let who_keywords: KeywordInfo[] = [];
            let what_keywords: KeywordInfo[] = [];

            when_keywords = await Keyword.find({ writer:userId, year:year, month:month, category:'when'}).sort({ count: -1 })
            if (when_keywords.length !== 0){
                rank1s.push({content:when_keywords[0].content});
            }
            where_keywords = await Keyword.find({ writer:userId, year:year, month:month, category:'where'}).sort({ count: -1 }) 
            if (where_keywords.length !== 0){
                rank1s.push({content:where_keywords[0].content});
            }
            who_keywords = await Keyword.find({ writer:userId, year:year, month:month, category:'who'}).sort({ count: -1 }) 
            if (who_keywords.length !== 0){
                rank1s.push({content:who_keywords[0].content});
            }
            what_keywords = await Keyword.find({ writer:userId, year:year, month:month, category:'what'}).sort({ count: -1 }) 
            if(what_keywords.length !== 0){
                rank1s.push({content:what_keywords[0].content});
            }

            //rank2
            let all_keywords: KeywordInfo[] = [];
            all_keywords = await Keyword.find({ writer:userId, year:year, month:month}).sort({ count: -1 }) 
            for (var i = 0; i <4; i++){
                if(all_keywords[i]){
                    rank2s.push({content:all_keywords[i].content,category:all_keywords[i].category,count:all_keywords[i].count});
                }
            }
            
            // rank3
            let images: String[] = [];
            rank3s = await getCategoryRank(userId,year,month,option,4)

            // rank4
            films = await Film.find({ writer:userId, year:year, month:month})
            rank4s.push({month:month,count:films.length})

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

export default {
    getAllRank,
};