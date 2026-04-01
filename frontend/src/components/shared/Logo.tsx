import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      title="Go to Home"
      onClick={() => navigate('/')}
      className="cursor-pointer text-2xl font-bold tracking-tight"
    >
      <span className="text-primary">Dev</span>
      <span className="text-foreground">Press</span>
    </div>
  );
};

export default Logo;
