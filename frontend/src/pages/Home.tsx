import { useAuthContext } from '@/context/AuthContext';
import NavBar from '../components/shared/NavBar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      {user && (
        <Button
          className="mb-4"
          onClick={() => {
            navigate('/articles/new');
          }}
        >
          Add Article
        </Button>
      )}
      <Button
        className="mb-4"
        variant="outline"
        onClick={() => {
          navigate('/articles');
        }}
      >
        Go To List
      </Button>
    </>
  );
};

export default Home;
