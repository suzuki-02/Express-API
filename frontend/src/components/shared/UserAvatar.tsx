import { useNavigate } from 'react-router-dom';

type AvatarProps = {
  name: string | undefined;
  size?: string; // e.g., 'w-12 h-12'
};

const UserAvatar: React.FC<AvatarProps> = ({ name, size = 'w-10 h-10' }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };

  const initials = (name ?? '')
    .split(' ')
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div
      title="Go to Profile"
      onClick={handleClick}
      className={`flex items-center justify-center ${size} rounded-full bg-slate-100 text-slate-950 font-medium cursor-pointer hover:ring-2 hover:ring-slate-300 transition`}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
