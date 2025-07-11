import useArticles from '@/hooks/useArticles';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteArticleButton from '../../components/articles/DeleteArticleButton';
import { Button } from '@/components/ui/button';

const DetailArticle = () => {
  const { id } = useParams(); // URL: /articles/:id
  const { currentArticle, fetchArticleById } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchArticleById(id);
  }, [id, fetchArticleById]);

  if (!currentArticle) return <p>Loading...</p>;
  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>
      <p className="text-gray-400 mb-2">{currentArticle.description}</p>
      <div className="whitespace-pre-wrap">{currentArticle.content}</div>
      <p className="text-sm text-gray-500 mt-4">
        Published: {currentArticle.isPublished ? 'Yes' : 'No'}
      </p>
      <Button onClick={() => navigate('/articles')}>Back</Button>
      <DeleteArticleButton id={currentArticle._id} />
    </div>
  );
};

export default DetailArticle;
