import useAuth from "@/hooks/useAuth";
import { AuthContext } from "./AuthContext";

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
    updateUser,
    deleteUser,
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
    loading,
    updateUser,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};