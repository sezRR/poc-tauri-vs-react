import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { Badge } from "./components/ui/badge";
import React from "react";
import { BottomToolbar } from "./components/bottom-toolbar";
import { GridBackgroundDemo } from "./components/grid-background";
import { ThemeProvider } from "./components/theme-provider";
import { useReactCounterStore } from "./stores/countersStore";
import { useRustCounterStore } from "./stores/rustCounterStore";
import { useStartCounter } from "./hooks/useStartCounter";

export default function App() {
  return (
    <ThemeProvider>
      <GridBackgroundDemo>
        <main className="flex h-dvh flex-col items-center justify-center">
          <h1 className="upp scroll-m-20 text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl">
            Infinite Counter
          </h1>
          <div className="flex flex-row gap-12">
            <div className="mt-4 flex flex-col-reverse items-center justify-center gap-4">
              <Badge variant="default">React + Vite</Badge>
              <ReactCounter />
            </div>
            <div className="mt-4 flex flex-col-reverse items-center justify-center gap-4">
              <Badge variant="default">Tauri + Rust</Badge>
              <TauriCounter />
            </div>
          </div>
        </main>
        <BottomToolbar />
      </GridBackgroundDemo>
    </ThemeProvider>
  );
}

// Separate component for React Counter
const ReactCounter: React.FC = React.memo(() => {
  useStartCounter(); // Start the counter logic

  return <CounterDisplay counter={useReactCounterStore().counter} />;
});

const TauriCounter: React.FC = React.memo(() => {
  const tauriCounterStore = useRustCounterStore();

  useEffect(() => {
    const setupListener = async () => {
      const unlisten = await listen<number>("counter-update", (event) => {
        tauriCounterStore.increment(event.payload);
      });

      return unlisten;
    };

    const unlistenPromise = setupListener();

    return () => {
      unlistenPromise.then((unlisten) => unlisten()); // Clean up the event listener on unmount
    };
  }, [tauriCounterStore]);

  return <CounterDisplay counter={tauriCounterStore.count} />;
});

// Memoized counter display component
const CounterDisplay: React.FC<{ counter: number }> = React.memo(
  ({ counter }) => {
    return (
      <p className="text-xl font-semibold leading-7 text-accent-foreground">
        Counter: {counter}
      </p>
    );
  },
);
