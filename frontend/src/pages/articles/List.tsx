// import { useEffect } from 'react';
// import useArticles from '@/hooks/useArticles';
// import type { Article } from '@/types';
// import ArticleCard from '@/components/articles/ArticleCard';

// const ListArticles = () => {
//   const { articles, fetchArticles } = useArticles();

//   useEffect(() => {
//     fetchArticles();
//   }, [fetchArticles]);

//   return (
//     <section className="max-w-4xl mx-auto mt-10 px-4 text-white">
//       <h1 className="text-3xl font-bold mb-6">Articles</h1>

//       <div className="space-y-4">
//         {articles.length > 0 ? (
//           articles.map((article: Article) => (
//             <ArticleCard key={article._id} article={article} />
//           ))
//         ) : (
//           <p className="text-center text-muted-foreground">
//             No articles found.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ListArticles;

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useArticles from '@/hooks/useArticles';
import type { Article } from '@/types';
import ArticleCard from '@/components/articles/ArticleCard';
import SearchBar from '@/components/articles/SearchBar';
import Pagination from '@/components/articles/Pagination';

const ListArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { articles, meta, loading, fetchArticles } = useArticles();

  /**
   * Read current URL params.
   * These become the single source of truth for the page state.
   */
  const q = searchParams.get('q') ?? '';

  const rawPage = Number(searchParams.get('page') ?? '1');
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  useEffect(() => {
    const run = async () => {
      const response = await fetchArticles({
        page,
        limit: 1,
        q,
        publishedOnly: false,
      });

      if (!response?.meta) return;

      if (response.meta.page !== page) {
        const next = new URLSearchParams();
        if (q) next.set('q', q);
        next.set('page', String(response.meta.page));
        setSearchParams(next, { replace: true });
      }
    };

    run();
  }, [fetchArticles, page, q, setSearchParams]);

  /**
   * Update page in URL.
   * We update the URL instead of calling fetchArticles directly,
   * because the effect above already handles fetching.
   */
  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 text-black space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Articles</h1>
        <SearchBar />
      </div>

      {meta && (
        <div className="text-sm text-muted-foreground">
          {meta.totalItems > 0 ? (
            <>
              Showing page {meta.page} of {meta.totalPages}
              {q && <> for "{q}"</>} · {meta.totalItems} result
              {meta.totalItems !== 1 ? 's' : ''}
            </>
          ) : (
            <>No articles found{q && <> for "{q}"</>}</>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-center text-muted-foreground">Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No articles found.</p>
      )}

      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          hasNextPage={meta.hasNextPage}
          hasPrevPage={meta.hasPrevPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default ListArticles;
