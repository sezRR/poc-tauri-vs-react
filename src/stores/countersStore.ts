import { create } from "zustand";

// Define the store using Zustand
interface Store {
    counter: number;
    increment: () => void;
    reset: () => void;
}

// Create a Zustand store
const createCounterStore = () => create<Store>((set) => ({
    counter: 0,
    increment: () =>
        set((state) => ({
            counter: state.counter + 1,
        })),
    reset: () =>
        set(() => ({
            counter: 0,
        })),
}));

export const useReactCounterStore = createCounterStore();
