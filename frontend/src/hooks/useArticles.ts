import type {
  Article,
  ArticlesMeta,
  FetchArticlesParams,
  GetArticlesResponse,
} from '@/types';
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

  const [meta, setMeta] = useState<ArticlesMeta | null>(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const fetchArticles = useCallback(async () => {
  //   const res = await safeRequest<Article[]>(
  //     () => axiosInstance.get('/articles'),
  //     { toast: false },
  //   );
  //   if (res) setArticles(res);
  // }, []);

  // const fetchArticles = useCallback(
  //   async (params: FetchArticlesParams = {}) => {
  //     setLoading(true);
  //     try {
  //       const res = await safeRequest<GetArticlesResponse>(
  //         () =>
  //           axiosInstance.get('/articles', {
  //             params,
  //           }),
  //         { toast: false },
  //       );
  //       if (res) {
  //         setArticles(res.data);
  //         setMeta(res.meta);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [],
  // );

  const fetchArticles = useCallback(
    async (params: FetchArticlesParams = {}) => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.get<GetArticlesResponse>(
          '/articles',
          {
            params,
          },
        );

        /**
         * Backend response structure:
         *
         * {
         *   success: true,
         *   message: "...",
         *   data: Article[],
         *   meta: {...}
         * }
         */

        if (data.success) {
          setArticles(data.data);
          setMeta(data.meta);
        }

        return data;
      } catch (error) {
        console.error('Failed to fetch articles:', error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchArticleById = useCallback(async (id: string) => {
    const res = await safeRequest<Article>(
      () => axiosInstance.get(`/articles/${id}`),
      { toast: false },
    );
    if (res) setCurrentArticle(res);
    return res;
  }, []);

  const createArticle = async (article: CreateArticleInput) => {
    console.log('Creating article:', article);
    return safeRequest<Article>(() =>
      axiosInstance.post('/articles/new', article),
    );
  };

  const updateArticle = async (
    id: string,
    article: Partial<CreateArticleInput>,
  ) => {
    return safeRequest<Article>(() =>
      axiosInstance.put(`/articles/${id}`, article),
    );
  };

  const deleteArticle = async (id: string) => {
    return safeRequest<void>(() => axiosInstance.delete(`/articles/${id}`));
  };

  return {
    articles,
    meta,
    loading,
    currentArticle,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
  };
};

export default useArticles;
