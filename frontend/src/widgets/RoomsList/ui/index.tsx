import ErrorParser from "@shared/services/ErrorParser";
import { ProductsSkeletons } from "@shared/common/ProductsSkeletons";
import { addNotification } from "@store/slices/Notifications";
import { NotificationsSeverityTypes } from "@utils/constants";
import { useLoadRoomsQuery } from "@entities/Room/api";
import { RoomCard } from "@features/RoomCard";
import { IRoom } from "@entities/Room/types";
import { useDispatch } from "react-redux";
import { ReactElement } from "react";
import "./style.css";

const RoomsList = (): ReactElement => {
    const dispatch = useDispatch();

    const { data, isLoading, error } = useLoadRoomsQuery();

    if (isLoading) {
        return <ProductsSkeletons />;
    }

    if (!!error || !data) {
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
                <RoomCard key={roomData.id} room={roomData} />
            ))}
        </div>
    );
};

export default RoomsList;
