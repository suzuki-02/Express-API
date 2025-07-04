import { createContext, useContext } from 'react';
import type { AuthContextType } from '../types/types';

// export const useAuthContext = () : AuthContextType=> {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
//   return ctx;
// };

// export const AuthContext = createContext<AuthContextType | null>(null);

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
