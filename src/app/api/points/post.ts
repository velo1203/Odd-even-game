import { editPoints, getUserByEmail } from "@/model/user.model";
import { getServerSession } from "next-auth";
const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 99) + 1;
    return random;
};

export async function PostGame(request: Request) {
    const res = await request.json();
    const session: any = await getServerSession();
    if (!session) {
        return Response.json({ error: "Not authorized" }, { status: 401 });
    }
    if (res.number <= 0) {
        return Response.json(
            { error: "0보다 큰수를 입력하세요" },
            { status: 400 }
        );
    }
    const user = await getUserByEmail(session.user.email);
    if (!user) {
        return Response.json(
            { error: "유저가 존재하지 않습니다" },
            { status: 404 }
        );
    }
    if (res.number > user.points) {
        return Response.json({ error: "개수를 줄여주세요" }, { status: 401 });
    }
    var result;
    var newPoints;
    const randomNumber = generateRandomNumber();
    if (res.mode === "even") {
        if (randomNumber % 2 === 0) {
            newPoints = user.points + res.number;
            result = "win";
        } else {
            newPoints = user.points - res.number;
            result = "lose";
        }
    }
    if (res.mode === "odd") {
        if (randomNumber % 2 === 1) {
            newPoints = user.points + res.number;
            result = "win";
        } else {
            newPoints = user.points - res.number;
            result = "lose";
        }
    }
    editPoints(session.user.email, newPoints);
    return Response.json({ result: result, randomNumber, newPoints });
}
