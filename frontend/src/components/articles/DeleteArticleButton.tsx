import { Button } from '@/components/ui/button';
import useArticles from '@/hooks/useArticles';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeleteArticleButton = ({ id }: { id: string }) => {
  const { deleteArticle } = useArticles();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?'))
      return;
    const result = await deleteArticle(id);
    if (result !== null) navigate('/');
  };

  return (
    <Button onClick={handleDelete} variant="destructive" size="sm">
      <Trash />
      Delete
    </Button>
  );
};

export default DeleteArticleButton;
