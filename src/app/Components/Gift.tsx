import { toast } from "react-toastify";
import styles from "./Gift.module.css";
import { useState } from "react";

export default function Gift({ setUserPoints }: any) {
    const [number, setNumber] = useState(0);
    const [target, setTarget] = useState("");

    const onGift = () => {
        fetch("/api/gift", {
            method: "POST",
            body: JSON.stringify({ quantity: number, email: target }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    toast.error(res.error);
                } else {
                    setUserPoints(res.newPoints);
                    toast.success("선물했습니다!");
                }
            });
    };
    return (
        <div className={styles.main}>
            <h1>선물주기</h1>
            <div className={styles.container}>
                <div className={styles.box}>
                    <p>유저</p>
                    <input
                        onChange={(e) => setTarget(e.target.value)}
                        type="text"
                        className={styles.NumberInput}
                        placeholder="유저 이름을 입력하세요"
                    />
                </div>
                <div className={styles.box}>
                    <p>개수</p>
                    <input
                        onChange={(e) => setNumber(Number(e.target.value))}
                        type="text"
                        className={styles.NumberInput}
                        placeholder="숫자를 입력하세요"
                    />
                </div>
                <button onClick={onGift}>선물하기</button>
            </div>
        </div>
    );
}
