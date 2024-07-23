import { getServerSession } from "next-auth";

import { editPoints, getUserByEmail } from "@/model/user.model";

const generateRandomNumber = () => Math.floor(Math.random() * 99) + 1;

export async function PostGame(request: Request) {
    try {
        const res = await request.json();
        const session: any = await getServerSession();

        if (!session) {
            return new Response(JSON.stringify({ error: "Not authorized" }), {
                status: 401,
            });
        }

        const { mode, number } = res;
        if (![0, 1].includes(parseInt(mode))) {
            return new Response(
                JSON.stringify({ error: "비정상적인 접근입니다." }),
                { status: 400 }
            );
        }

        if (number <= 0) {
            return new Response(
                JSON.stringify({ error: "0보다 큰수를 입력하세요" }),
                { status: 400 }
            );
        }

        const user = await getUserByEmail(session.user.email);
        if (!user) {
            return new Response(
                JSON.stringify({ error: "유저가 존재하지 않습니다" }),
                { status: 404 }
            );
        }

        if (number > user.points) {
            return new Response(
                JSON.stringify({ error: "개수를 줄여주세요" }),
                { status: 401 }
            );
        }

        const randomNumber = generateRandomNumber();
        const isWin = randomNumber % 2 === mode;
        const newPoints = isWin ? user.points + number : user.points - number;
        const result = isWin ? "win" : "lose";

        await editPoints(session.user.email, newPoints);

        return new Response(
            JSON.stringify({ result, randomNumber, newPoints }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "서버 에러가 발생했습니다" }),
            { status: 500 }
        );
    }
}
