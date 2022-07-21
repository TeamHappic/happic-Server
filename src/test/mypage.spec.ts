import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();


describe('GET /mypage', () => {
    // 해픽레포트 조회 
  it('해픽레포트 조회 - 성공', (done) => {
    req(app)
      .get('/mypage')
      .query({year:'2022',month:'7'})
      .set('Content-Type', 'application/json') 
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  
  it('해픽레포트 조회 - query 값 없음', (done) => {
    req(app)
      .get('/mypage')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
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

describe('GET /mypage/keyword', () => {
    // 해픽레포트 키워드 전체 순위 조회 
  it('해픽레포트 키워드 전체 순위 조회 - 성공', (done) => {
    req(app)
      .get('/mypage/keyword')
      .query({year:'2022',month:'7'})
      .set('Content-Type', 'application/json') 
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  
  it('해픽레포트 키워드 전체 순위 조회 - query 값 없음', (done) => {
    req(app)
      .get('/mypage/keyword')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
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

describe('GET /mypage/category', () => {
    // 해픽레포트 카테고리별 순위 전체 
  it('해픽레포트 카테고리별 순위 전체 조회 - 성공', (done) => {
    req(app)
      .get('/mypage/category')
      .query({year:'2022',month:'7',option:'when'})
      .set('Content-Type', 'application/json') 
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  
  it('해픽레포트 카테고리별 순위 전체 조회 - query 값 없음', (done) => {
    req(app)
      .get('/mypage/category')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
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

describe('GET /mypage/monthly', () => {
    // 월별 해픽레포트 조회 
  it('월별 해픽레포트 조회 - 성공', (done) => {
    req(app)
      .get('/mypage/monthly')
      .query({year:'2022',month:'7'})
      .set('Content-Type', 'application/json') 
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(200)
      .then((res) => {
        done();
      })
      .catch((err) => {
        console.error('######Error >>', err);
        done(err);
      });
  });
  
  it('월별 해픽레포트 조회 - query 값 없음', (done) => {
    req(app)
      .get('/mypage/monthly')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .expect(400)
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