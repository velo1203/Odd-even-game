function UserTitle({ points, stack }: { points: number; stack: number }) {
    const getTitle = () => {
        if (points >= 1000) {
            return "알파메일";
        } else if (stack >= 100) {
            return "베타메일";
        } else if (stack >= 50) {
            return "신용불량자";
        }
        return "";
    };

    const title = getTitle();

    return <span className={title}>{title}</span>;
}

export default UserTitle;
