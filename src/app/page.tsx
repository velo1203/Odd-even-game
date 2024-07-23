"use client";

import axios from "axios";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Profiler, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Gift from "./Components/Gift";
import Notification from "./Components/Notification";
import PopupWrapper from "./Components/PopupWrapper";
import Profile from "./Components/Profile";
import Users from "./Components/Users";
import styles from "./page.module.css";

export default function Home() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [number, setNumber] = useState(0); // 배팅 개수
    const [userPoints, setUserPoints] = useState(-1); // 유저 포인트
    const [resNum, setResNum] = useState(0); // 배팅 결과 숫자
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    useEffect(() => {
        axios.get("api/user").then((res) => {
            setUser(res.data);
            setUserPoints(res.data.points);
        });
    }, [userPoints]);

    const handleRetry = () => {
        axios
            .post("api/bankruptcy")
            .then((res) => {
                toast.success("보조금을 받았습니다!.");
                setUserPoints(5);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            });
    };

    const handleGame = (mode: 0 | 1) => () => {
        axios
            .post("api/points", { mode, number })
            .then((res) => {
                setResNum(res.data.randomNumber);
                setUserPoints(res.data.newPoints);
                if (res.data.result === "win") {
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
            <Notification />
            <PopupWrapper isOpen={isPopupOpen} onClose={closePopup}>
                <Gift setUserPoints={setUserPoints} />
            </PopupWrapper>
            <div className={styles.section}>
                {user && (
                    <div className={styles.infomation}>
                        <h1>{user.name}님</h1>
                        <p>
                            <span>{userPoints}</span>개 보유
                        </p>

                        <button onClick={openPopup}>선물</button>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                        >
                            로그아웃
                        </button>
                    </div>
                )}

                {userPoints === 0 && (
                    <div className={styles.retry}>
                        <p>보조금으로 다시 시작해보세요!</p>
                        <button onClick={handleRetry}>지원받기</button>
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
                        <button onClick={handleGame(1)}>홀</button>
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
                        <button onClick={handleGame(0)}>짝</button>
                    </div>
                </div>
                {user && (
                    <div>
                        <Profile user={user} />
                    </div>
                )}
            </div>
            <div>
                <Users />
            </div>
        </main>
    );
}
