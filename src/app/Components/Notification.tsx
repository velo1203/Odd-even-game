import styles from "./Notification.module.css";

export default function Notification() {
    return (
        <div className={styles.notification}>
            <h1>공지사항</h1>
            <h2>방과후때 서버 개선하겠습니다</h2>
        </div>
    );
}
