import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import AuthCard from '@/components/auth/AuthCard';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Login failed');
      }
    }
  };

  return (
    <AuthCard
      title="Login Form"
      description="Login to your account"
      inputs={[
        {
          type: 'email',
          placeholder: 'Email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
          required: true,
          icon: <Mail size={16} />,
        },
        {
          type: 'password',
          placeholder: 'Password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          icon: <Lock size={16} />,
        },
      ]}
      buttonText="Sign In"
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLink="/register"
      footerNav="Sign Up"
    />
  );
};

export default Login;
