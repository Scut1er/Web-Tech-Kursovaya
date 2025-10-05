import { useRef, useState } from "react";

interface IUseDebounceReturn {
    runDebounced: <T>(
        callback: () => T,
        isClearPreviousProcess?: boolean
    ) => void;
    rejectDebounceCallback: () => void;
    isRunningDebounced: boolean;
}

const useDebounce = (
    timeout: number,
    onRerun?: () => void
): IUseDebounceReturn => {
    const [isRunningDebounced, setIsRunningDebounced] =
        useState<boolean>(false);

    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const runDebounced = <T>(
        callback: () => T,
        isClearPreviousProcess: boolean = true
    ): void => {
        if (timeoutIdRef.current && isClearPreviousProcess) {
            clearTimeout(timeoutIdRef.current);
        }

        if (!!onRerun) {
            onRerun();
        }

        timeoutIdRef.current = setTimeout(() => {
            callback();

            setIsRunningDebounced(false);
        }, timeout);

        setIsRunningDebounced(true);
    };

    const rejectDebounceCallback = (): void => {
        if (!timeoutIdRef.current) {
            return;
        }

        clearTimeout(timeoutIdRef.current);

        setIsRunningDebounced(false);
    };

    return { runDebounced, rejectDebounceCallback, isRunningDebounced };
};

export default useDebounce;
