import { create } from "zustand";

type UserState = {
  user: User | null;
};

type UserAction = {
  login: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));
