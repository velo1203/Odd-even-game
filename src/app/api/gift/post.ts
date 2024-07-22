import { getServerSession } from "next-auth";

import { editPoints, getUserByEmail } from "@/model/user.model";

export async function Gift(request: Request) {
    try {
        const res = await request.json();
        const session: any = await getServerSession();

        const quantity = res.quantity;
        const email = res.email;
        if (email == session.user.email) {
            return new Response(
                JSON.stringify({ error: "자신에게 선물할 수 없습니다" }),
                { status: 401 }
            );
        }
        if (!session || !session.user || !session.user.email) {
            return new Response(
                JSON.stringify({ error: "유저가 존재하지 않습니다" }),
                { status: 404 }
            );
        }

        const user = await getUserByEmail(session.user.email);
        if (!user) {
            return new Response(
                JSON.stringify({ error: "유저가 존재하지 않습니다" }),
                { status: 404 }
            );
        }

        if (quantity < 1) {
            return new Response(
                JSON.stringify({ error: "1개 이상 입력해주세요" }),
                { status: 401 }
            );
        }

        if (quantity > user.points) {
            return new Response(
                JSON.stringify({ error: "개수를 줄여주세요" }),
                { status: 401 }
            );
        }

        const target = await getUserByEmail(email);
        if (!target) {
            return new Response(
                JSON.stringify({ error: "상대방이 존재하지 않습니다" }),
                { status: 404 }
            );
        }

        await editPoints(session.user.email, user.points - quantity);
        await editPoints(email, target.points + quantity);

        return new Response(JSON.stringify({ message: "선물했습니다" }), {
            status: 200,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "서버 에러가 발생했습니다" }),
            { status: 500 }
        );
    }
}
