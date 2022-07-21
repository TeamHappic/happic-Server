
// import { expect } from 'chai';
// import app from '../index';
// import dotenv from 'dotenv';
// import req from 'supertest';
// dotenv.config();

// describe('GET /daily', () => {
//     // 해당 년,월 하루해픽 전체 조회
//   it('해당 년,월 하루해픽 전체 조회 - 성공', (done) => {
//     req(app)
//       .get('/daily')
//       .query({year:'2022',month:'7'})
//       .set('Content-Type', 'application/json') 
//       .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
//       .expect(200)
//       .then((res) => {
//         done();
//       })
//       .catch((err) => {
//         console.error('######Error >>', err);
//         done(err);
//       });
//   });
  
//   it('해당 년,월 하루해픽 전체 조회 - query 값 없음', (done) => {
//     req(app)
//       .get('/daily')
//       .set('Content-Type', 'application/json')
//       .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
//       .expect(404)
//       .expect('Content-Type', /json/)
//       .then((res) => {
//         done();
//       })
//       .catch((err) => {
//         console.error('######Error >>', err);
//         done(err);
//       });
//   });

// });

// describe('GET /daily/title', () => {
//     // 하루제목 전체 조회
//   it('하루제목 전체 조회 - 성공', (done) => {
//     req(app)
//       .get('/daily/title')
//       .query({year:'2022',month:'7'})
//       .set('Content-Type', 'application/json') 
//       .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
//       .expect(200)
//       .then((res) => {
//         done();
//       })
//       .catch((err) => {
//         console.error('######Error >>', err);
//         done(err);
//       });
//   });
  
//   it('하루제목 전체 조회 조회 - query 값 없음', (done) => {
//     req(app)
//       .get('/daily/title')
//       .set('Content-Type', 'application/json')
//       .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
//       .expect(404)
//       .expect('Content-Type', /json/)
//       .then((res) => {
//         done();
//       })
//       .catch((err) => {
//         console.error('######Error >>', err);
//         done(err);
//       });
//   });

// });