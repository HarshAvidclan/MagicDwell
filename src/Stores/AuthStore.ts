import { create } from 'zustand';
import { API } from '../Services/API/Api';
import { AuthService } from '../Services/API/AuthService';
import { UserRoles } from '../Services/Utility/Enums';
import { User } from '../Services/API/URL/URLS';
import { GetCurrentUserResult } from '../Services/API/Result/ResultIndex';

interface AuthState {
  CurrentUser: GetCurrentUserResult | null;
  Roles: string[];
  isLoading: boolean;
  error: string | null;
  FetchCurrentUser: () => Promise<void>;
  ClearCurrentUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  CurrentUser: null,
  Roles: [],
  isLoading: false,
  error: null,

  FetchCurrentUser: async () => {
    const token = await AuthService.getToken();
    if (!token) return;

    set({ isLoading: true, error: null });
    try {
      const res = await API.POST<GetCurrentUserResult>(User.GETCURRENTUSER, {});
      console.log('Fetched CurrentUser:', res);
      set({ CurrentUser: res, Roles: res.Roles, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch CurrentUser',
        Roles: [],
        isLoading: false,
      });
      await AuthService.removeToken();
    }
  },

  ClearCurrentUser: async () => {
    set({ CurrentUser: null, Roles: [], error: null });
    await AuthService.removeToken();
  },
}));