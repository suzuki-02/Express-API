import { Router } from 'express';
import {
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUserById);

// userRouter.post('/', (req, res) => {
//   res.send({
//     title: 'POST create user',
//   });
// });

userRouter.put('/:id', authorize, updateUserById);

userRouter.delete('/:id', authorize, deleteUserById);

export default userRouter;
