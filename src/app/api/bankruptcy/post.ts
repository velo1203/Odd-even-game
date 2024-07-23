import { getServerSession } from "next-auth";
import Email from "next-auth/providers/email";

import { getUserByEmail, RegenerationUser } from "@/model/user.model";
export async function Bankruptcy(request: Request) {
    try {
        const session: any = await getServerSession();

        const user = await getUserByEmail(session.user.email);
        if (!user) {
            return new Response(
                JSON.stringify({ error: "유저가 존재하지 않습니다" }),
                { status: 404 }
            );
        }
        if (user.points == 0) {
            RegenerationUser(session.user.email);
            return new Response(
                JSON.stringify({ message: "포인트가 부여되었습니다!" }),
                {
                    status: 200,
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "포인트가 0이 아닙니다" }),
                { status: 401 }
            );
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: "서버 에러" }), {
            status: 500,
        });
    }
}
