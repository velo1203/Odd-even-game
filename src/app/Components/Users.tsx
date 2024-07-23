import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import styles from "./Users.module.css";

export default function Users() {
    const [users, setUsers] = useState([]);

    const fetchData = () => {
        axios.get("/api/points").then((res) => {
            setUsers(res.data);
            toast.success("갱신했습니다!");
        });
    };

    useEffect(() => {
        fetchData(); // 초기 데이터 로드`

        const interval = setInterval(() => {
            fetchData();
        }, 20000); //5초마다 갱신
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.title}>
                <h1>랭킹</h1>
                <button onClick={fetchData}>새로고침</button>
            </div>
            {users.length > 0 && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>이름</th>
                            <th>개수</th>
                            <th>파산스택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, i) => (
                            <tr key={user.id}>
                                <td>
                                    <Image
                                        src={user.picture}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.points}</td>
                                <td>{user.stack}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
