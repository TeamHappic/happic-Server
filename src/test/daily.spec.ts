import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();


describe('GET /daily/poseted', () => {
    // 하루해픽 생성 가능여부 조회 
  it('하루해픽 생성 가능여부 조회 - 성공', (done) => {
    req(app)
      .get('/daily/poseted')
      .set('Content-Type', 'application/json') 
      
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
});