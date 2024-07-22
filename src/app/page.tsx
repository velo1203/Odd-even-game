"use client";

import styles from "./page.module.css";
import Users from "./Components/Users";
import { useEffect, useState } from "react";
import PopupWrapper from "./Components/PopupWrapper";
import Gift from "./Components/Gift";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [number, setNumber] = useState(0); //배팅 개수
    const [userPoints, setUserPoints] = useState(0); //유저 포인트
    const [resNum, setResNum] = useState(0); //배팅 결과 숫자
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        axios.get("api/user").then((res) => {
            setUser(res.data);
            setUserPoints(res.data.points);
        });
    }, [userPoints]);

    const handleGame = (mode: "odd" | "even") => () => {
        axios
            .post("api/points", { mode, number })
            .then((res) => {
                setResNum(res.data.randomNumber);
                setUserPoints(res.data.newPoints);
                if (res.data.result == "win") {
                    toast.success("맞췄습니다!");
                } else {
                    toast.error("틀렸습니다!");
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            });
    };

    return (
        <main className={styles.main}>
            <PopupWrapper isOpen={isPopupOpen} onClose={closePopup}>
                <Gift />
            </PopupWrapper>
            <div className={styles.section}>
                {user && (
                    <div className={styles.infomation}>
                        <div>
                            <h1>{user.name}님</h1>
                            <p>
                                <span>{userPoints}</span>개 보유
                            </p>
                            <button onClick={openPopup}>선물</button>
                        </div>
                    </div>
                )}

                <div className={styles.background}>
                    <div className={styles.container}>
                        <div className={styles.box}>
                            <h1>나온 숫자</h1>
                            <p>{resNum}</p>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <button onClick={handleGame("odd")}>홀</button>
                        <div className={styles.container}>
                            <input
                                type="number"
                                className={styles.NumberInput}
                                onChange={(e) => {
                                    setNumber(Number(e.target.value));
                                }}
                            />
                            <p>개 배팅</p>
                        </div>
                        <button onClick={handleGame("even")}>짝</button>
                    </div>
                </div>
            </div>
            <div>
                <Users />
            </div>
        </main>
    );
}
