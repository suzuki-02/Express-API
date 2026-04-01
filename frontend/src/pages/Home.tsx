// import { useAuthContext } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { user } = useAuthContext();
//   const navigate = useNavigate();

//   return (
//     <>
//       <section className="pink_container">
//         <h1 className="heading">
//           Pitch Your Startup, <br />
//           Connect With Entrepreneurs
//         </h1>
//         <p className="sub-heading !max-w-3xl">
//           Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
//         </p>
//       </section>

//       {user && (
//         <Button
//           className="mb-4"
//           onClick={() => {
//             navigate('/articles/new');
//           }}
//         >
//           Add Article
//         </Button>
//       )}
//       <Button
//         className="mb-4"
//         variant="outline"
//         onClick={() => {
//           navigate('/articles');
//         }}
//       >
//         Go To List
//       </Button>
//     </>
//   );
// };

// export default Home;


import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { useAuthContext } from '@/context/AuthContext';
import useArticles from '@/hooks/useArticles';
import ArticleCard from '@/components/articles/ArticleCard';
import type { Article } from '@/types';

const Home = () => {
  // const { user } = useAuthContext();
  const navigate = useNavigate();

  const { articles, loading, fetchArticles } = useArticles();

  useEffect(() => {
    fetchArticles({
      page: 1,
      limit: 3,
      publishedOnly: false,
    });
  }, [fetchArticles]);

  return (
    <>
      <section className="hero_section">
        <h1 className="heading">
          Share Ideas, <br />
          Write and Explore Articles
        </h1>

        <p className="sub-heading !max-w-3xl">
          Discover recent posts, publish your own ideas, and build a portfolio of
          thoughtful content.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => {
              navigate('/articles');
            }}
          >
            View All Articles
          </Button>

          {/* {user && (
            <Button
              onClick={() => {
                navigate('/articles/new');
              }}
            >
              Write an Article
            </Button>
          )} */}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-10 px-4">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Latest Articles</h1>
            <p className="text-sm text-muted-foreground">
              A quick preview of the most recent published posts.
            </p>
          </div>

          <Link
            to="/articles"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading articles...</p>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: Article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No published articles yet.
          </p>
        )}
      </section>
    </>
  );
};

export default Home;
