import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,

  interests: [],
  hasOnboarded: false,

  login: async (email, password) => {
    if (!email || !password) throw new Error("Email ve şifre gerekli");
    set({ token: "demo-token", user: { name: "Hüseyin", email } });
  },

  setInterests: (interests) => set({ interests }),
  completeOnboarding: () => set({ hasOnboarded: true }),

  logout: () =>
    set({ token: null, user: null, interests: [], hasOnboarded: false }),
}));
