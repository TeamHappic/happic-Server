import { KeywordInfo } from "../interfaces/keyword/KeywordInfo";
import { KeywordOptionType } from "../interfaces/keyword/KeywordOptionType";
import { KeywordResponseDto } from "../interfaces/keyword/KeywordResponseDto";
import Keyword from "../models/Keyword";

const getAllRank = async (
    year : string,
    month : string,
    option:  KeywordOptionType,
): Promise<KeywordResponseDto[]> => {

    let keywords: KeywordInfo[] = [];
    let rank1s = []
    let rank2s = []
    let rank3s = []
    let rank4s = []
    try {
        if (year && month) {
            //rank1
            let when_keywords: KeywordInfo[] = [];
            let where_keywords: KeywordInfo[] = [];
            let who_keywords: KeywordInfo[] = [];
            let what_keywords: KeywordInfo[] = [];

            when_keywords = await Keyword.find({year:year, month:month, category:'when'}).sort({ count: -1 })
            if (when_keywords.length !== 0){
                rank1s.push({content:when_keywords[0].content});
            }
            where_keywords = await Keyword.find({ year:year, month:month, category:'where'}).sort({ count: -1 }) 
            if (where_keywords.length !== 0){
                rank1s.push({content:where_keywords[0].content});
            }
            who_keywords = await Keyword.find({ year:year, month:month, category:'who'}).sort({ count: -1 }) 
            if (who_keywords.length !== 0){
                rank1s.push({content:who_keywords[0].content});
            }
            what_keywords = await Keyword.find({ year:year, month:month, category:'what'}).sort({ count: -1 }) 
            if(what_keywords.length !== 0){
                rank1s.push({content:what_keywords[0].content});
            }
            console.log(rank1s)

            //rank2
            let all_keywords: KeywordInfo[] = [];
            all_keywords = await Keyword.find({ year:year, month:month}).sort({ count: -1 }) 
            for (var i = 0; i <4; i++){
                if(all_keywords[i]){
                    rank2s.push({content:all_keywords[i].content,category:all_keywords[i].category,count:all_keywords[i].count});
                }
            }
            console.log(rank2s)

            
            // rank3
            if (option === 'when') {
                keywords = await Keyword.find({ year:year, month:month, category:'when'}).sort({ count: -1 }) 
                if (keywords.length!==0){
                    
                }
            } else if (option === 'where') {
                keywords = await Keyword.find({ year:year, month:month, category: 'where' })
                    .sort({ count: -1 }) 
            }else if (option === 'who') {
                keywords = await Keyword.find({ year:year, month:month, category: 'who' })
                    .sort({ count: -1 })
            } else if (option === 'what') {
                keywords = await Keyword.find({ year:year, month:month, category: 'what' })
                    .sort({ count: -1 }) 
            }

            // rank4
            keywords = await Keyword.find({ year:year, month:month})
            rank4s.push({month:month,count:keywords.length})

        } 

        const data = {
            rank1s,
            rank2s,
            rank4s
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