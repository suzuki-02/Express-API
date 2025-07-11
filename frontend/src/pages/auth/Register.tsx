import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import AuthCard from '@/components/auth/AuthCard';
import { Lock, Mail, User } from 'lucide-react';

const Register = () => {
  const { register } = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Register failed');
      }
    }
  };

  const inputs = [
    {
      type: 'text',
      placeholder: 'Username',
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setName(e.target.value),
      required: true,
      icon: <User size={16} />,
    },
    {
      type: 'email',
      placeholder: 'Email',
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      required: true,
      icon: <Mail size={16} />,
    },
    {
      type: 'password',
      placeholder: 'Password',
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      required: true,
      icon: <Lock size={16} />,
    },
  ];

  return (
    <AuthCard
      title="Register Form"
      description="Create your account"
      onSubmit={handleSubmit}
      inputs={inputs}
      buttonText="Sign Up"
      footerText="Already have an account?"
      footerLink="/login"
      footerNav="Sign In"
    />
  );
};

export default Register;
