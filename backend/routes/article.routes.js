import { Router } from 'express';
import {
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller.js';

const articaleRouter = Router();

articaleRouter.get('/', getArticles);

articaleRouter.get('/:id', getArticleById);

articaleRouter.post('/new', addArticle);

articaleRouter.put('/:id', updateArticle);

articaleRouter.delete('/:id', deleteArticle);


export default articaleRouter;
