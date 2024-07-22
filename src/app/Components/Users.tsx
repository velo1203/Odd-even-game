import { useEffect, useState } from "react";
import styles from "./Users.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/api/points").then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.title}>
                <h1>랭킹</h1>
                <button
                    onClick={() => {
                        axios.get("/api/points").then((res) => {
                            setUsers(res.data);
                        });
                        toast.success("갱신했습니다!");
                    }}
                >
                    새로고침
                </button>
            </div>
            {users.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th>이름</th>
                            <th>개수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, i) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
