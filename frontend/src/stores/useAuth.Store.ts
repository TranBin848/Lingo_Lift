import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { authService } from "../services/auth.Service";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

    clearState: () => set({
    accessToken: null,
    user: null,
    loading: false,
  }),

  signUp: async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      set({ loading: true });
      const data = await authService.signUp({
        username,
        email,
        password,
        firstName,
        lastName,
      });

      // If API returns tokens/user, store them. Adjust as your backend returns.
      if (data?.accessToken) {
        set({ accessToken: data.accessToken });
      }
      if (data?.user) {
        set({ user: data.user });
      }

      toast.success("Sign Up Successful!");
      return;
    } catch (error) {
      console.error("Sign Up Error:", error);
      toast.error("Sign Up Failed. Please try again.");
      // Rethrow so callers can react (navigation, form errors)
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const data = await authService.signIn({ username, password });
      if (data?.accessToken) {
        set({ accessToken: data.accessToken });
      }
      if (data?.user) {
        set({ user: data.user });
      }
      // ✅ Bỏ fetchMe() vì .NET API đã trả về đầy đủ user info
      // await get().fetchMe();
      toast.success("Welcome back to LingoLift! 🎉");
      return data;
    } catch (error) {
      console.error("Sign In Error:", error);
      toast.error("Sign In Failed. Please check your credentials and try again.");
      throw error;
    } finally {
      set({ loading: false });
    }

  },
  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Signed out successfully.");
    } catch (error) {
      console.error("Sign Out Error:", error);
      toast.error("Sign Out Failed. Please try again.");
      throw error;
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user });
    }
    catch (error) {
      console.error("Fetch Me Error:", error);
      set({ user: null, accessToken: null });
      toast.error("Failed to fetch user data. Please try again.");
      throw error;
    }
    finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
      try {
        const {user, fetchMe, accessToken} = get();
        
        // Nếu không có token, không cần refresh
        if (!accessToken) {
          return;
        }
        
        set({ loading: true });
        const newAccessToken = await authService.refresh();
        set({ accessToken: newAccessToken });
        if (user == null) {
          // TODO: await fetchMe() khi có API
        }

      } catch (error) {
        console.error("Token Refresh Error:", error);
        // KHÔNG clear state ngay, chỉ log error
        // Chỉ clear state khi người dùng thực sự gọi API và nhận 401
        // get().clearState();
        // set({ accessToken: null, user: null });
        // toast.error("Session expired. Please sign in again.");
        throw error;
      }
      finally {
        set({ loading: false });
      }
    },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);
