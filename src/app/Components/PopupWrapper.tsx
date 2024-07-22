// components/PopupWrapper.js
import React from "react";

import styles from "./PopupWrapper.module.css";

const PopupWrapper = ({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.popup}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
};

export default PopupWrapper;
