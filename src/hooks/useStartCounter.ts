import { useReactCounterStore } from '@/stores/countersStore';
import { useEffect } from 'react';

// Custom hook to manage the counter increment logic
export const useStartCounter = () => {
    const [counter, increment] = useReactCounterStore((state) => [state.counter, state.increment]);

    useEffect(() => {
        let lastEmit = Date.now();

        // Use the browser's native setInterval
        const interval = window.setInterval(() => {
            const now = Date.now();

            // Increment the counter every millisecond
            increment();

            // Emit updates every second
            if (now - lastEmit >= 1000) {
                console.log('Counter update:', counter); // Emit counter value
                lastEmit = now; // Reset the timer
            }
        }, 1); // Increment every millisecond

        // Cleanup the interval on component unmount
        return () => window.clearInterval(interval);
    }, [increment, counter]); // Dependencies: increment function and counter state
};
