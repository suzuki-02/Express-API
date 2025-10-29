import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import UserAvatar from './UserAvatar';
import Logo from './Logo';

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthContext();

  return (
    <nav className="bg-gray-950 text-white shadow-sm py-3 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        <div className="text-xl font-bold tracking-tight">
          {user ? `Hi, ${user.username}` : 'Welcome'}
        </div>

        {/* Right: Auth Buttons or Avatar */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                onClick={logout}
                variant="destructive"
                className="text-sm px-4"
              >
                Logout
              </Button>
              <UserAvatar name={user?.username} />
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                variant="secondary"
                className="text-sm px-4"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/register')}
                variant="secondary"
                className="text-sm px-4"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
