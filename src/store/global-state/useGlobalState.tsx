import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "@interfaces/user.interface";

type State = {
  user: User | null | undefined;
  isLoggedIn: boolean;
};

type Action = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
};

export const useGlobalState = create<State & Action>()(
  immer((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  }))
);
