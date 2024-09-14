import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FaBell,
  FaCircleExclamation,
  FaGear,
  FaReact,
  FaRust,
  FaTrash,
} from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { useReactCounterStore } from "@/stores/countersStore";
import { useRustCounterStore } from "@/stores/rustCounterStore";

export function BottomToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  const resetReactCounter = useReactCounterStore((state) => state.reset);
  const resetRustCounter = useRustCounterStore((state) => state.reset);

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center">
      <div className="flex flex-col items-center">
        <div className="rounded-full border bg-background px-3 py-2 shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverContent
                className="mb-4 w-64 rounded-t-3xl bg-background p-0 shadow-none"
                align="center"
                sideOffset={0}
              >
                <div className="space-y-2 p-6">
                  <h4 className="mb-4 font-semibold uppercase leading-none">
                    Reset COUNTERS
                  </h4>
                  <Separator />
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={resetReactCounter}
                  >
                    <FaReact className="mr-2 h-4 w-4" />
                    React
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={resetRustCounter}
                  >
                    <FaRust className="mr-2 h-4 w-4" />
                    Rust
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start uppercase"
                    onClick={() => {
                      resetReactCounter();
                      resetRustCounter();
                    }}
                  >
                    <FaCircleExclamation className="mr-2 h-4 w-4" />
                    ALL
                  </Button>
                </div>
              </PopoverContent>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${isOpen ? "bg-accent" : ""}`}
                  aria-label="Add"
                >
                  <FaTrash size={18} />
                </Button>
              </PopoverTrigger>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Notifications"
            >
              <FaBell size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Settings"
            >
              <FaGear size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
