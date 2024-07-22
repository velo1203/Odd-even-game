import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { getUserByEmail } from "@/model/user.model";


export async function GetUserInfo() {
    const session: any = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const user = await getUserByEmail(session.user.email);
    return NextResponse.json(user);
}
