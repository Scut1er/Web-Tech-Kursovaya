import useThrottling from "./useThrottling";
import { useEffect } from "react";

type TAnyRefetch = (...args: any[]) => Promise<any> | void;

const useQueryRefetchManager = <TRefetch extends TAnyRefetch>(
    refetch: TRefetch,
    interval: number
) => {
    const { runThrottling } = useThrottling(interval);

    useEffect(() => {
        runThrottling(() => {
            refetch();
        });
    }, [runThrottling, refetch, interval]);
};

export default useQueryRefetchManager;
