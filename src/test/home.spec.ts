import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('GET /home', () => {
    it('홈화면 조회 - 성공', (done) => {
      req(app)
        .get('/daily')
        .query({ year: 2022, month: 7 })
        .set('Content-Type', 'application/json')
        .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          done();
        })
        .catch((err) => {
          console.error('######Error >>', err);
          done(err);
        });
    });
  });
  