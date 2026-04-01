import {
  Card,
  CardAction,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Article } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import DeleteArticleButton from './DeleteArticleButton';
import useAuth from '@/hooks/useAuth';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';

const ArticleCard = ({ article }: { article: Article }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // if (!article) return <div>Give Me Article</div>;
  if (!article) return null;

  return (
    // <Card key={article._id} className="mb-4">
    //   <CardHeader>
    //     <Link to={`/articles/${article._id}`} key={article._id}>
    //       <CardTitle>{article.title}</CardTitle>
    //     </Link>
    //     <CardDescription>{article.tags}</CardDescription>
    //     {/* <CardAction>
    //       {isLoggedIn && <DeleteArticleButton id={article._id} />}
    //       <Button
    //         variant="outline"
    //         onClick={() => navigate(`/articles/${article._id}/edit`)}
    //       >
    //         <Edit />
    //         Edit
    //       </Button>
    //     </CardAction> */}
    //   </CardHeader>
    //   <CardContent>
    //     <strong>{article.description && article.description}</strong>
    //     {/* <p>{article.content}</p> */}
    //   </CardContent>
    //   <CardFooter>
    //     <p>Created At: {new Date(article.createdAt).toLocaleDateString()}</p>
    //   </CardFooter>
    // </Card>

<Card className="article-card">
  <CardHeader>
    <div className="article-card-date">
      {new Date(article.createdAt).toLocaleDateString()}
    </div>

    <Link to={`/articles/${article._id}`}>
      <CardTitle className="article-card-title">
        {article.title}
      </CardTitle>
    </Link>
  </CardHeader>

  <CardAction>
    {isLoggedIn && <DeleteArticleButton id={article._id} />}
    <Button
      variant="outline"
      onClick={() => navigate(`/articles/${article._id}/edit`)}
    >
      <Edit />
      Edit
    </Button>
  </CardAction>

  <CardContent>
    {article.description && (
      <p className="article-card-description">
        {article.description}
      </p>
    )}
  </CardContent>

  <CardFooter className="article-card-footer">
    <span className="article-card-tags">
      {article.tags?.join(', ')}
    </span>

    <Link
      to={`/articles/${article._id}`}
      className="article-card-link"
    >
      Read More
    </Link>
  </CardFooter>
</Card>
  );
};

export default ArticleCard;
