import { useEffect } from 'react';
import useArticles from '@/hooks/useArticles';
import type { Article } from '@/types';
import ArticleCard from '@/components/articles/ArticleCard';

const ListArticles = () => {
  const { articles, fetchArticles } = useArticles();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No articles found.
          </p>
        )}
      </div>
    </section>
  );
};

export default ListArticles;
