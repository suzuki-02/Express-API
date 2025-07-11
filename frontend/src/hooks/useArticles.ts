import type { Article } from '@/types';
import { safeRequest } from '@/utils/api';
import axiosInstance from '@/utils/axios';
import { useCallback, useState } from 'react';

interface CreateArticleInput {
  title: string;
  description?: string;
  content: string;
  isPublished: boolean;
  userId: string;
}

const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const fetchArticles = useCallback(async () => {
    const res = await safeRequest<Article[]>(
      () => axiosInstance.get('/articles'),
      { toast: false }
    );
    if (res) setArticles(res);
  }, []);

  const fetchArticleById = useCallback(async (id: string) => {
    const res = await safeRequest<Article>(
      () => axiosInstance.get(`/articles/${id}`),
      { toast: false }
    );
    if (res) setCurrentArticle(res);
    return res;
  }, []);

  const createArticle = async (article: CreateArticleInput) => {
    console.log('Creating article:', article);
    return safeRequest<Article>(() =>
      axiosInstance.post('/articles/new', article)
    );
  };

  const updateArticle = async (
    id: string,
    article: Partial<CreateArticleInput>
  ) => {
    return safeRequest<Article>(() =>
      axiosInstance.put(`/articles/${id}`, article)
    );
  };

  const deleteArticle = async (id: string) => {
    return safeRequest<void>(() => axiosInstance.delete(`/articles/${id}`));
  };

  return {
    articles,
    currentArticle,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
  };
};

export default useArticles;
