import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('GET /home', () => {
  it('홈화면 조회 - 성공', (done) => {
    req(app)
      .get('/home')
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

describe('GET /home/capsule', () => {
  //
  it('해픽캡슐 조회 - 성공', (done) => {
    req(app)
      .get('/home/capsule')
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

    it('해픽캡슐 조회 - 실패', (done) => {
      req(app)
        .get('/home/capsule')
        .set('Content-Type', 'application/json')
        .set({ Authorization: `Bearer ${""}` })
        .expect(401)
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
