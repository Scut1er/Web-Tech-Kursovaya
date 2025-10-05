import useThrottling from "./useThrottling";
import { useEffect } from "react";

const useQueryRefetchManager = <TRefetch extends () => void>(
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
