import { invoke } from "@tauri-apps/api/tauri";
import { create } from "zustand";

interface RustCounterStore {
    count: number;
    increment: (count_from_event: number) => void;
    reset: () => void;
}

const getCounterTick = async () => {
    return await invoke<number>("get_counter_tick");
}

const resetCounterTick = async () => {
    return await invoke("reset_counter_tick");
}

const createRustCounterStore = () =>
    create<RustCounterStore>((set) => {
        // Fetch the initial counter value asynchronously
        getCounterTick()
            .then((count) => {
                set({ count });
            })
            .catch((error) => {
                console.error("Failed to fetch initial counter:", error);
            });

        return {
            count: 0,
            // Update the counter from an external event
            increment: (count_from_event: number) => set(() => {
                console.log("Incremented counter from event, counterStore.ts:", count_from_event);
                return { count: count_from_event };
            }),
            // Reset the counter with the backend
            reset: () => {
                resetCounterTick()
                    .then(() => {
                        set({ count: 0 });
                    })
                    .catch((error) => {
                        console.error("Failed to reset counter:", error);
                    });
            }
        };
    });

export const useRustCounterStore = createRustCounterStore();
