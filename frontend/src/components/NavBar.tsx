import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthContext();

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-lg font-semibold">
        Hello, {user?.username || 'Developer'}!
      </h1>
      {isLoggedIn ? (
        <button
          onClick={() => logout()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition"
        >
          Log out
        </button>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded transition"
        >
          Login
        </button>
      )}
      {!isLoggedIn && (
        <button
          onClick={() => navigate('/register')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded transition"
        >
          Register
        </button>
      )}
    </nav>
  );
};

export default NavBar;
