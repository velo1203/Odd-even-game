"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./Gift.module.css";

interface User {
    id: string;
    name: string;
    email: string;
}

interface GiftProps {
    setUserPoints: (points: number) => void;
}

export default function Gift({ setUserPoints }: GiftProps) {
    const [number, setNumber] = useState<number>(0);
    const [target, setTarget] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const onSearch = async () => {
        try {
            const res = await fetch(`/api/users?user=${target}`);
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setUsers(data);
            }
        } catch (error) {
            toast.error("검색 할 수 없습니다.");
        }
    };

    const onGift = async () => {
        if (!selectedUser) {
            toast.error("유저를 선택해주세요");
            return;
        }
        try {
            console.log(selectedUser);
            const res = await axios.post("/api/gift", {
                email: selectedUser.email,
                quantity: number,
            });
            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                setUserPoints(res.data.newPoints);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("선물을 보낼 수 없습니다.");
        }
    };

    return (
        <div className={styles.main}>
            <h1>선물주기</h1>
            <div className={styles.container}>
                {selectedUser?.name && (
                    <h2>
                        <span>{selectedUser.name}</span> 선택됨
                    </h2>
                )}
                <div className={styles.box}>
                    <ul className={styles.userList}>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={
                                    selectedUser?.id === user.id
                                        ? styles.selected
                                        : ""
                                }
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.box}>
                    <input
                        onChange={(e) => setTarget(e.target.value)}
                        type="text"
                        className={styles.numberInput}
                        placeholder="유저 이름을 입력하세요"
                    />
                    <button onClick={onSearch} className={styles.button}>
                        검색
                    </button>
                </div>
                <div className={styles.box}>
                    <input
                        onChange={(e) => setNumber(Number(e.target.value))}
                        type="number"
                        className={styles.numberInput}
                        placeholder="숫자를 입력하세요"
                    />
                </div>
                <button onClick={onGift} className={styles.button}>
                    선물하기
                </button>
            </div>
        </div>
    );
}
