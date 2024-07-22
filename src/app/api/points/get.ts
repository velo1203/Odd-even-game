import { getTop5Users } from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GetTopUsers() {
    const users = await getTop5Users();

    return NextResponse.json(users);
}
