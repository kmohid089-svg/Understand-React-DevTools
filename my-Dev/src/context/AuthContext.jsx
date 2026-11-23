import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('mb_user');
    return stored ? JSON.parse(stored) : null;
  });

  function login(userData) {
    setUser(userData);
    localStorage.setItem('mb_user', JSON.stringify(userData));
    // token is saved by the Login page via localStorage.setItem('mb_token', ...)
    // but if login() is called without a token (demo mode), we don't overwrite it
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('mb_user');
    localStorage.removeItem('mb_token');
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
