import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Auth API', () => {
  // ユーザー登録

  beforeEach(async () => {
    // 全削除
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }

    // テスト用ユーザーをセットアップ
    await request(app).post('/api/v1/auth/sign-up').send({
      username: 'loginuser',
      email: 'login@example.com',
      password: 'mypassword',
    });
  });

  describe('POST /api/v1/auth/sign-up', () => {
    it('新規ユーザーを正常に作成できる', async () => {
      const res = await request(app).post('/api/v1/auth/sign-up').send({
        username: 'testuser1',
        email: 'testuser1@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty(
        'email',
        'testuser1@example.com'
      );
    });

    it('同じメールアドレスの重複登録は失敗する', async () => {
      await request(app).post('/api/v1/auth/sign-up').send({
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/v1/auth/sign-up').send({
        username: 'testuser2-dup',
        email: 'testuser2@example.com',
        password: 'password456',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  // ログイン
  describe('POST /api/v1/auth/sign-in', () => {
    it('正しい情報でログインできる', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'login@example.com',
        password: 'mypassword',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
    });

    it('間違ったパスワードでログイン失敗', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'login@example.com',
        password: 'wrongpassword',
      });

      expect(res.statusCode).toBe(401);
    });

    it('登録されていないメールアドレスでログイン失敗', async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: 'nonexistent@example.com',
        password: 'whatever',
      });

      expect(res.statusCode).toBe(404);
    });
  });

  // ログアウト
  describe('POST /api/v1/auth/sign-out', () => {
    it('サインアウト成功メッセージが返る', async () => {
      const res = await request(app).post('/api/v1/auth/sign-out');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty(
        'message',
        'User signed out successfully'
      );
    });
  });
});
