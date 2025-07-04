import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/Axios';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/types';
import { safeRequest } from '../utils/api';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await safeRequest<{ token: string; user: User }>(() =>
      axiosInstance.post('/auth/sign-up', { username, email, password })
    );

    if (res) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user._id);
      setIsLoggedIn(true);
      await getUser();
      navigate('/');
    }
  };

  const login = async (email: string, password: string) => {
    const res = await safeRequest<{ token: string; user: User }>(() =>
      axiosInstance.post('/auth/sign-in', { email, password })
    );

    if (res) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user._id);
      setIsLoggedIn(true);
      await getUser();
      navigate('/');
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  }, []);

  const getUser = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      toast.error('Missing token or userId');
      return;
    }

    const user = await safeRequest<User>(() =>
      axiosInstance.get(`/users/${userId}`)
    );

    if (user) setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        if (res.data.success) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUser,
    register,
    login,
    logout,
    loading,
  };
};

export default useAuth;
