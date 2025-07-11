import { useNavigate } from 'react-router-dom';
import useArticles from '@/hooks/useArticles';
import { useAuthContext } from '@/context/AuthContext';
import type { ArticleFormData } from '@/types';
import ReusableArticleForm from '../../components/articles/ReusableArticleForm';

export default function CreateArticle() {
  const { createArticle } = useArticles();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (values: ArticleFormData) => {
    if (!user) {
      alert('You must be logged in to create an article.');
      return;
    }

    const result = await createArticle({
      ...values,
      isPublished: values.visibility === 'public',
      userId: user._id,
    });

    if (result) navigate('/');
  };

  return (
    <ReusableArticleForm
      defaultValues={{
        title: '',
        description: '',
        content: '',
        visibility: 'public',
      }}
      onSubmit={handleSubmit}
      mode="create"
    />
  );
}
