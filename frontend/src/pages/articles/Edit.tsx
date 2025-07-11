import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useArticles from '@/hooks/useArticles';
import ReusableArticleForm from '../../components/articles/ReusableArticleForm';
import type { ArticleFormData } from '@/types';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchArticleById, updateArticle } = useArticles();
  const [defaultValues, setDefaultValues] = useState<ArticleFormData | null>(
    null
  );

  useEffect(() => {
    if (id) {
      fetchArticleById(id).then((article) => {
        if (article) {
          setDefaultValues({
            title: article.title,
            description: article.description ?? '',
            content: article.content,
            visibility: article.isPublished ? 'public' : 'private',
          });
        }
      });
    }
  }, [id, fetchArticleById]);

  const handleSubmit = async (values: ArticleFormData) => {
    if (!id) return;

    const result = await updateArticle(id, {
      ...values,
      isPublished: values.visibility === 'public',
    });

    if (result) navigate(`/articles/${id}`);
  };

  if (!defaultValues) return <div>Loading...</div>;

  return (
    <ReusableArticleForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      mode="edit"
    />
  );
}
