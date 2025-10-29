import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      title="Go to Home"
      onClick={() => navigate('/')}
      className="cursor-pointer text-2xl font-bold tracking-tight text-emerald-400 hover:text-emerald-300 transition"
    >
      DevPress
    </div>
  );
};

export default Logo;
