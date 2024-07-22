import styles from "./Users.module.css";

export default function Users() {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.title}>
                <h1>랭킹</h1>
                <button>새로고침</button>
            </div>
            <table className={styles.table}>
                <tr>
                    <th>순서</th>
                    <th>이름</th>
                    <th>개수</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>심호성</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>심호성</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>심호성</td>
                    <td>20</td>
                </tr>
            </table>
        </div>
    );
}
