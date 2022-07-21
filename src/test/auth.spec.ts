import {expect} from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

/**
 * 카카오 회원가입
 * 201, 404 케이스
 */
describe('POST /user/signup', () => {
    //카카오 회원가입 성공 케이스
    it('카카오 회원가입 - 성공', (done) => {
        req(app)
            .post('/user/user/signin')
            .set('Content-Type', 'application/json')
            .send({
                social: process.env.SOCIAL,
                characterId: process.env.CHARACTER_ID,
                characterName: process.env.CHARACTER_NAME,
                accessToken: process.env.KAKAO_TOKEN
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                done();
            })
            .catch((err => {
                console.error('######Error >>', err);
                done(err);
            }));
    });

    //카카오 로그인 404 에러
    
});