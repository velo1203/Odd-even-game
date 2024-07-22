import styles from "./Users.module.css";

export default function Users() {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.title}>
                <h1>랭킹</h1>
                <button>새로고침</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>순서</th>
                        <th>이름</th>
                        <th>개수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>심호성</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>김철수</td>
                        <td>18</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>이영희</td>
                        <td>15</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
