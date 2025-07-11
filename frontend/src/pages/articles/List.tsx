import { useEffect } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useArticles from '@/hooks/useArticles';
import { Link, useNavigate } from 'react-router-dom';
import DeleteArticleButton from '../../components/articles/DeleteArticleButton';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import type { Article } from '@/types';

const ListArticles = () => {
  const { articles, fetchArticles } = useArticles();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-transparent p-6 rounded-lg shadow text-white">
        <h1 className="text-3xl font-bold mb-6">Home Page</h1>
        <Button
          className="mb-4"
          onClick={() => {
            navigate('/');
          }}
        >
          HOME
        </Button>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Articles</h2>

        <div className="space-y-4">
          {articles &&
            articles.map((article: Article) => (
              <Card key={article._id} className="mb-4">
                <CardHeader>
                  <Link to={`/articles/${article._id}`} key={article._id}>
                    <CardTitle>{article.title}</CardTitle>
                  </Link>
                  <CardDescription>{article.tags}</CardDescription>
                  <CardAction>
                    <DeleteArticleButton id={article._id} />
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/articles/${article._id}/edit`)}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <strong>{article.description && article.description}</strong>
                  <p>{article.content}</p>
                </CardContent>
                <CardFooter>
                  <p>
                    Created At:{' '}
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListArticles;
