export type User = {
  _id: string;
  username: string;
  email: string;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
}

export type AuthContextType = {
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