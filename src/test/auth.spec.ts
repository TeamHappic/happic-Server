import {expect} from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

/**
 * 카카오 로그인
 * 401 케이스
 */
 describe('POST /user/signin', () => {
    //카카오 로그인 성공
    it('카카오 로그인 - 성공', (done) => {
        req(app)
            .post('/user/signin')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
            .send({
                accessToken: process.env.TEST_TOKEN
            })
            .expect(201)
            .then((res) => {
                done();
              })
            .catch((err => {
                console.error('######Error >>', err);
                done(err);
            }));
    });
    
     //카카오 로그인 401 에러
     it('카카오 로그인 - 유효하지 않은 토큰', (done) => {
        req(app)
            .post('/user/signin')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${'1234'}` })
            .send({
                accessToken: '1234'
            })
            .expect(500)
            .expect('Content-Type', /json/)
            .then((res) => {
                done();
              })
            .catch((err => {
                console.error('######Error >>', err);
                done(err);
            }));
    });
    
});