import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Error {
  detail: string;
} 

interface AuthState {
  session: any;
}

interface AuthActions {
  setSession: (session: any) => void;
  login: (email: string, password: string) => Promise<Error>;
  logout: () => Promise<void>;
}

const serverUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      login: async (email, password) => {
        if (!email) return Promise.reject(new Error("Email is required"));
        if (!password) return Promise.reject(new Error("Password is required"));

        const response = await fetch(serverUrl + "/login", {
          method: "POST",
          body: new URLSearchParams(`username=${email}&password=${password}`),
        });
        const data = await response.json();
        if (data.detail) return Promise.resolve(data);
        set({ session: data.access_token });
        return Promise.resolve(data);
      },
      logout: async () => {
        set({ session: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);


export default useAuthStore;