// src/Stores/AuthStore.ts
import { create } from 'zustand';
import { API } from '../Services/API/Api';
import { AuthService } from '../Services/API/AuthService';
import { User } from '../Services/API/URL/URLS';
import { GetCurrentUserResult } from '../Services/API/Result/ResultIndex';

interface AuthState {
  CurrentUser: GetCurrentUserResult | null;
  Roles: string[];
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  FetchCurrentUser: () => Promise<void>;
  ClearCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  CurrentUser: null,
  Roles: [],
  isLoading: false,
  error: null,
  isAuthenticated: false,

  FetchCurrentUser: async () => {
    const token = await AuthService.getToken();
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const res = await API.POST<GetCurrentUserResult>(User.GETCURRENTUSER, {});
      console.log('Fetched CurrentUser:', res);
      set({ 
        CurrentUser: res, 
        Roles: res.Roles, 
        isLoading: false,
        isAuthenticated: true 
      });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch CurrentUser',
        Roles: [],
        isLoading: false,
        isAuthenticated: false,
      });
      await AuthService.removeToken();
    }
  },

  ClearCurrentUser: async () => {
    set({ 
      CurrentUser: null, 
      Roles: [], 
      error: null,
      isAuthenticated: false 
    });
    await AuthService.removeToken();
  },
}));