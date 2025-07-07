import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

let token;
let userId;

jest.setTimeout(15000); // DB操作が重いとき用

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }

  // サインアップ
  const signUpRes = await request(app).post('/api/v1/auth/sign-up').send({
    username: 'tester',
    email: 'tester@example.com',
    password: 'secure123',
  });

  if (signUpRes.statusCode !== 201) {
    console.error('Signup failed:', signUpRes.body);
    throw new Error('Signup failed during test setup');
  }

  // ログイン
  const loginRes = await request(app).post('/api/v1/auth/sign-in').send({
    email: 'tester@example.com',
    password: 'secure123',
  });

  if (loginRes.statusCode !== 200 || !loginRes.body.data) {
    console.error('Login failed:', loginRes.body);
    throw new Error('Login failed during test setup');
  }

  token = loginRes.body.data.token;
  userId = loginRes.body.data.user._id;
});

describe('User API', () => {
  describe('GET /api/v1/users', () => {
    it('ユーザー一覧を取得できる', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('特定ユーザーをトークン付きで取得できる', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('_id', userId);
    });

    it('トークンなしでは拒否される', async () => {
      const res = await request(app).get(`/api/v1/users/${userId}`);
      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('ユーザー情報を更新できる', async () => {
      const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'updatedName' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('username', 'updatedName');
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('ユーザーを削除できる', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('_id', userId);
    });

    it('削除されたユーザーを再取得すると401', async () => {
      await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(401); // ユーザーが削除されているのでトークンも無効
    });
  });
});
