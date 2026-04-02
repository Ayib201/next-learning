'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuthService } from './use-services';
import { IUserResponseDTO, ILoginDTO, IRegisterDTO } from '@/core/dtos/user.dto';

interface AuthContextType {
  user: IUserResponseDTO | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (dto: ILoginDTO) => Promise<{ success: boolean; error?: string }>;
  register: (dto: IRegisterDTO) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const authService = useAuthService();
  const [user, setUser] = useState<IUserResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('isi_token');
        if (token) {
          const result = await authService.validateToken(token);
          if (result.success && result.data) {
            setUser(result.data);
          } else {
            localStorage.removeItem('isi_token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [authService]);

  const login = useCallback(async (dto: ILoginDTO) => {
    setIsLoading(true);
    try {
      const result = await authService.login(dto);
      if (result.success && result.data) {
        setUser(result.data.user);
        localStorage.setItem('isi_token', result.data.token);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Une erreur est survenue' };
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const register = useCallback(async (dto: IRegisterDTO) => {
    setIsLoading(true);
    try {
      const result = await authService.register(dto);
      if (result.success && result.data) {
        setUser(result.data.user);
        localStorage.setItem('isi_token', result.data.token);
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Une erreur est survenue' };
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    localStorage.removeItem('isi_token');
  }, [authService]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
