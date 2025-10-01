"use client";

import { Dialog } from "primereact/dialog";
import { ReactElement } from "react";

interface ItemModalProps {
    visible: boolean;
    onHide: () => void;
    header: string;
    children: ReactElement;
}

const ItemModal = ({
    visible,
    onHide,
    header,
    children,
}: ItemModalProps): ReactElement => {
    return (
        <Dialog header={header} visible={visible} onHide={onHide}>
            {children}
        </Dialog>
    );
};

export default ItemModal;
