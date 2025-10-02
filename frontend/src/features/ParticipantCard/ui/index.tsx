"use client";

import Image from "next/image";
import crownIconSrc from "@assets/icons/crownIcon.svg";
import { Badge, BadgeProps } from "primereact/badge";
import { Fragment, ReactElement } from "react";

interface IParticipantCardProps {
    name: string;
    isActive?: boolean;
    isOwner: boolean;
}

const ParticipantCard = ({
    name,
    isActive = false,
    isOwner,
}: IParticipantCardProps): ReactElement => {
    const valueComponent: BadgeProps["value"] =
        !isOwner || !isActive ? (
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
