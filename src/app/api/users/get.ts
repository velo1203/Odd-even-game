// API route
import { NextResponse } from "next/server";

import { SearchUser } from "@/model/user.model";

export async function GetUsers(req: Request) {
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("user");
    if (!search) {
        return NextResponse.json(
            { error: "검색어를 입력해주세요" },
            { status: 400 }
        );
    }
    const users = await SearchUser(search);
    return NextResponse.json(users);
}
