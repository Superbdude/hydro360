import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, verifyToken, updateUserProfile } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('hydro360_token');
      if (token) {
        try {
          const userData = await verifyToken(token);
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('hydro360_token');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const { token, user } = await loginUser(credentials);
      localStorage.setItem('hydro360_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { token, user } = await registerUser(userData);
      localStorage.setItem('hydro360_token', token);
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('hydro360_token');
    setUser(null);
  };

  const updateProfile = async (data) => {
    try {
      const updatedUser = await updateUserProfile(data);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
