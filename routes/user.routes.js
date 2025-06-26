import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send({
    title: 'GET all users',
  });
});

userRouter.get('/:id', (req, res) => {
  res.send({
    title: 'GET user by ID',
  });
});

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
