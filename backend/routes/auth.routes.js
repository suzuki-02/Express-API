import { Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

import authorize from '../middlewares/auth.middleware.js';

const authRouter = Router();

// Path: /api/v1/auth/sign-up (POST)
authRouter.post('/sign-up', signUp);

// Path: /api/v1/auth/sign-in (POST)
authRouter.post('/sign-in', signIn);

// Path: /api/v1/auth/sign-out (POST)
authRouter.post('/sign-out', signOut);

authRouter.get('/me', authorize, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default authRouter;
