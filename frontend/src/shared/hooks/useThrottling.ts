import { useEffect, useRef } from "react";

interface IUseThrottlingReturn {
    runThrottling: <T>(callback: () => T) => void;
    drop: () => void;
}

const useThrottling = (interval: number): IUseThrottlingReturn => {
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const runThrottling = <T>(callback: () => T): void => {
        if (!!intervalIdRef.current) {
            return;
        }

        intervalIdRef.current = setInterval(() => {
            callback();
        }, interval);
    };

    const drop = (): void => {
        if (!intervalIdRef.current) {
            return;
        }

        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    };

    useEffect(() => {
        return () => {
            drop();
        };
    }, []);

    return { runThrottling, drop };
};

export default useThrottling;
