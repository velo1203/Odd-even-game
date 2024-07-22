import { toast } from "react-toastify";
import styles from "./Gift.module.css";

export default function Gift() {
    const handleGift = () => {
        toast.success("선물 했습니다!");
    };
    return (
        <div className={styles.main}>
            <h1>선물주기</h1>
            <div className={styles.container}>
                <div className={styles.box}>
                    <p>유저</p>
                    <input
                        type="text"
                        className={styles.NumberInput}
                        placeholder="유저 이름을 입력하세요"
                    />
                </div>
                <div className={styles.box}>
                    <p>개수</p>
                    <input
                        type="text"
                        className={styles.NumberInput}
                        placeholder="숫자를 입력하세요"
                    />
                </div>
                <button onClick={handleGift}>선물하기</button>
            </div>
        </div>
    );
}
