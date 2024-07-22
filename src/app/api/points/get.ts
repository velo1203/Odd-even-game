import { NextResponse } from "next/server";

import { getTop5Users } from "@/model/user.model";

export async function GetTopUsers() {
    const users = await getTop5Users();

    return NextResponse.json(users);
}
