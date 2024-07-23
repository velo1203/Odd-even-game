import { NextResponse } from "next/server";

import { getTopUsers } from "@/model/user.model";

export async function GetTopUsers() {
    const users = await getTopUsers();

    return NextResponse.json(users);
}
