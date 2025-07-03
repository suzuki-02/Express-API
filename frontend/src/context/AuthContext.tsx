import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

interface User {
  _id: number;
  username: string;
  email: string;
}

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  getUser: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  getUser: async () => {},
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUser,
    register,
    login,
    logout,
    loading,
  } = useAuth();

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    getUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
