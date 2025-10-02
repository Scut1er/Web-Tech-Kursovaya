"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { ReactElement } from "react";
import "./style.css";

interface ILinkButtonProps {
    href: string;
    label: string;
    className?: string;
    icon?: string;
}

export const LinkButton = ({
    href,
    label,
    className = "",
    icon,
}: ILinkButtonProps): ReactElement => {
    return (
        <Link href={href} className="link-button-wrapper">
            <Button label={label} icon={icon} className={`${className}`} />
        </Link>
    );
};

export default LinkButton;
