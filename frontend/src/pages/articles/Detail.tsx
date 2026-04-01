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
    <>
      <section className="hero_section !min-h-[230px]">
        <h1 className="heading">{currentArticle.title}</h1>

        <p className="sub-heading !max-w-3xl">{currentArticle.description}</p>
      </section>

      <section className="content_section">
        <div className="whitespace-pre-wrap">{currentArticle.content}</div>
        <p className="text-sm text-gray-500 mt-4">
          Published: {currentArticle.isPublished ? 'Yes' : 'No'}
        </p>
        <Button onClick={() => navigate('/articles')}>Back</Button>
        <DeleteArticleButton id={currentArticle._id} />
      </section>
    </>
  );
};

export default DetailArticle;
