import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Button } from './ui/button';

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthContext();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-lg font-semibold">
        Hello, {user?.username || 'Developer'}!
      </h1>

      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <Button
              variant="destructive"
              onClick={logout}
              className="px-4"
            >
              Log out
            </Button>
            <Button onClick={() => navigate('/dashboard')} className="px-4">
              Profile
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4"
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
