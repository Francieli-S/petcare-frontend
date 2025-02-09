'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  JSX,
} from 'react';
import { User, AuthContextType } from '../types/auth';
import { apiRequest } from '../utils/api';
import { useRouter } from 'next/navigation';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getProfileInfo = async (): Promise<void> => {
    try {
      const data = await apiRequest("/users/profile");
      if (data.user) {
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getProfile = async () => {
        await getProfileInfo();
      };
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const data = await apiRequest('/users/login', 'POST', credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        await getProfileInfo();
        router.push('/profile');
      } else {
        router.push('/auth/login');
        throw new Error('Registration failed: No token returned.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
