"use client";

import Image from "next/image";
import crownIconSrc from "@assets/icons/crownIcon.svg";
import { Badge, BadgeProps } from "primereact/badge";
import { Fragment, ReactElement } from "react";

interface IParticipantCardProps {
    id: number;
    name: string;
    isActive?: boolean;
    ownerId: number;
}

const ParticipantCard = ({
    id,
    name,
    isActive = false,
    ownerId,
}: IParticipantCardProps): ReactElement => {
    const valueComponent: BadgeProps["value"] =
        ownerId !== id ? (
            name
        ) : (
            <Fragment>
                <Image src={crownIconSrc} alt="owner-icon" />
                <span>{name}</span>
            </Fragment>
        );

    return (
        <Badge value={valueComponent} className={isActive ? "active" : ""} />
    );
};

export default ParticipantCard;
