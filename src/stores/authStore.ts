import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}


const mockLogin = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
 
  const mockUsers: Record<string, User> = {
    'admin@clinic.com': {
      id: '1',
      email: 'admin@clinic.com',
      firstName: 'Alisher',
      lastName: 'Abdullayev',
      role: 'admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    'doctor@clinic.com': {
      id: '2',
      email: 'doctor@clinic.com',
      firstName: 'Ahmadjon',
      lastName: 'Qo`shboqov',
      role: 'doktor',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    'reception@clinic.com': {
      id: '3',
      email: 'foydalanuvchi@clinic.com',
      firstName: 'Sutonbek',
      lastName: 'O`skanboyev',
      role: 'foydalanuvchi',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  };

  const user = mockUsers[email];
  if (user && password === 'password') {
    return { user, token: 'mock-jwt-token-' + Date.now() };
  }
  
  throw new Error('Invalid credentials');
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(email, password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);