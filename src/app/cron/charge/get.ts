import { NextResponse } from "next/server";

import { editPoints, GetUserUnder10 } from "@/model/user.model";

const GET = async (
    req: Request
) => {
    // 헤더 설정
    const new_headers = new Headers();
    new_headers.append("Content-Type", "application/json; charset=utf-8");

    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Unauthorized",
        }), {
            status: 401,
            headers: new_headers
        });
    }

    try {
        const users = await GetUserUnder10();
        users.forEach((u) => {
            editPoints(u.email, 10);
        });
    }catch (e: any) {
        return new NextResponse(JSON.stringify({
            success: false,
            message: e.displayName,
        }), {
            status: 500,
            headers: new_headers
        });
    }

    return new NextResponse(JSON.stringify({
        success: true,
        message: "Success",
    }), {
        status: 200,
        headers: new_headers
    });
};

export default GET;