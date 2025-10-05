import ErrorParser from "@shared/services/ErrorParser";
import { ProductsSkeletons } from "@shared/common/ProductsSkeletons";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { useLoadRoomsQuery } from "@entities/UserRooms/api";
import { IUserPersonalData } from "@entities/User/types";
import { useDispatch, useSelector } from "react-redux";
import { IRoom } from "@entities/UserRooms/types";
import { RoomCard } from "@features/RoomCard";
import { TRootState } from "@store/index";
import { ReactElement } from "react";
import "./style.css";

const RoomsList = (): ReactElement => {
    const dispatch = useDispatch();

    const userPersonalData: IUserPersonalData | null = useSelector(
        (state: TRootState) => state.user.personalData
    );

    const { data, isFetching, error } = useLoadRoomsQuery();

    if (isFetching) {
        return (
            <ProductsSkeletons
                listStyles={{ maxHeight: "100%" }}
                skeletonStyles={{ height: "15rem" }}
                skeletonsCount={4}
            />
        );
    }

    if (!!error || !data || !userPersonalData) {
        dispatch(
            addNotification({
                text: ErrorParser.parseAxiosError(error),
                severity: NotificationsSeverityTypes.ERROR,
            })
        );

        return <div>Error on loading rooms</div>;
    }

    if (!data.length) {
        return <div>Rooms not found</div>;
    }

    return (
        <div className="rooms-list">
            {data.map((roomData: IRoom) => (
                <RoomCard
                    key={roomData.id}
                    room={roomData}
                    userId={userPersonalData.id}
                />
            ))}
        </div>
    );
};

export default RoomsList;
