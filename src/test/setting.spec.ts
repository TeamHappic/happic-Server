import { expect } from 'chai';
import app from '../index';
import dotenv from 'dotenv';
import req from 'supertest';
dotenv.config();

describe('PATCH /setting', () => {
  it('캐릭터 변경 - 성공', async () => {
    await req(app)
      .patch('/setting')
      .set('Content-Type', 'application/json')
      .set({ Authorization: `Bearer ${process.env.TEST_TOKEN}` })
      .send({
        characterId: 0,
        characterName: '병신',
      })
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
