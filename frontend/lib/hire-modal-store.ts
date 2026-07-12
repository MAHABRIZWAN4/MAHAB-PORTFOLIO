import { create } from 'zustand';

interface HireModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useHireModalStore = create<HireModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
