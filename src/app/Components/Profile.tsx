import Image from "next/image";
import React from "react";

import styles from "./Profile.module.css";

export default function Profile({ user }: any) {
    return (
        <div className={styles.profile}>
            <div className={styles.img}>
                <Image src={user.picture} alt="" width={50} height={50} />
                <div className={styles.info}>
                    <h1>{user.name}</h1>
                    <p>
                        점수 : <span>{user.points}</span>
                    </p>
                    <p>
                        파산스택 : <span>{user.stack}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
