"use client";

import styles from "./page.module.css";
import Users from "./Components/Users";
import { useState } from "react";
import PopupWrapper from "./Components/PopupWrapper";
import Gift from "./Components/Gift";

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    return (
        <main className={styles.main}>
            <PopupWrapper isOpen={isPopupOpen} onClose={closePopup}>
                <Gift />
            </PopupWrapper>
            <div className={styles.section}>
                <div className={styles.infomation}>
                    <div>
                        <h1>심호성님</h1>
                        <p>
                            <span>10</span>개 보유
                        </p>
                        <button onClick={openPopup}>선물</button>
                    </div>
                </div>
                <div className={styles.background}>
                    <div className={styles.container}>
                        <div className={styles.box}>
                            <h1>나온 숫자</h1>
                            <p>30</p>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <button>홀</button>
                        <div className={styles.container}>
                            <input type="text" className={styles.NumberInput} />
                            <p>개 배팅</p>
                        </div>
                        <button>짝</button>
                    </div>
                </div>
            </div>
            <div>
                <Users />
            </div>
        </main>
    );
}
