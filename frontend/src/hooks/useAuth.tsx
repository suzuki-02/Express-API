import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: number;
  username: string;
  email: string;
}

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
    const { data } = await axiosInstance.post('/auth/sign-up', {
      username,
      email,
      password,
    });

    if (data.success) {
      const res = data.data;
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user._id);
      setIsLoggedIn(true);
      await getUser();
      toast.success(data.message);
      navigate('/');
    } else {
      toast.error(data.message);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await axiosInstance.post('/auth/sign-in', {
      email,
      password,
    });
    if (data.success) {
      const res = data.data;
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.user._id);
      setIsLoggedIn(true);
      await getUser();
      toast.success(data.message);
      navigate('/');
    } else {
      throw new Error(data.message);
      // toast.error(data.message);
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
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        toast.error('Missing token or userId');
        return;
      }

      const { data } = await axiosInstance.get(`/users/${userId}`);
      data.success ? setUser(data.data) : setUser(null);
      if (!data.success) toast.error(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error getting user data');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        if (res.data.success) {
          setIsLoggedIn(true);
          setUser(res.data.user);
        }
      } catch (err) {
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
