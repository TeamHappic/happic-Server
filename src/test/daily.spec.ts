import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('GET /daily', () => {
  // 해당 년,월 하루해픽 전체 조회
  it('해당 년,월 하루해픽 전체 조회 - 성공', (done) => {
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

describe('GET /daily/posted', () => {
  // 하루필름 생성 가능 여부 조회
  it('하루필름 생성 가능 여부 조회 - 성공', (done) => {
    req(app)
      .get('/daily/posted')
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

describe('GET /daily/keyword', () => {
  // 하루해픽 최다 키워드 조회
  it('하루해픽 최다 키워드 조회 - 성공', (done) => {
    req(app)
      .get('/daily/keyword')
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

describe('POST /daily ', () => {
  it('하루해픽 생성 - 성공', async () => {
    await req(app)
      .post('/daily')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send({
        photo:
          'https://happic-build.s3.ap-northeast-2.amazonaws.com/1657875959590_aws_logo_smile_1200x630.png',
        when: 11,
        where: '홍대',
        who: '엄마',
        what: '아침먹기',
      })
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('하루해픽 생성 - 필요한 값이 없습니다', async () => {
    await req(app)
      .post('/daily')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send({
        title: 'API 테스트',
      })
      .expect(400);
  });
});

describe('DELETE /daily?filmId=', () => {
    it('하루 해픽 삭제 - 성공', async () => {
      await req(app)
        .delete('/daily')
        .set('Content-Type', 'application/json')
        .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
        .query({ filmId: '62d959e1d57341aedd43d765' })
        .expect(200)
        .expect('Content-Type', /json/);
    });
  
    it('하루 해픽 삭제 - 존재하지 않는 데이터입니다', async () => {
      await req(app)
        .delete('/daily')
        .set('Content-Type', 'application/json')
        .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
        .query({ filmId: '62d958ead57341aed' })
        .expect(404);
    });
  });