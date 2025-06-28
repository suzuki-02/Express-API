import { Router } from 'express';
import { getUserById, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUserById);

userRouter.post('/', (req, res) => {
  res.send({
    title: 'POST create user',
  });
});

userRouter.put('/:id', (req, res) => {
  res.send({
    title: 'Update user',
  });
});

userRouter.delete('/:id', (req, res) => {
  res.send({
    title: 'Delete user',
  });
});

export default userRouter;
