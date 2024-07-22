import prisma from "@/prisma.context";
interface User {
    name: string;
    picture: string;
    email: string;
}
export function createUser(user: User) {
    try {
        return prisma.user.create({
            data: user,
        });
    } catch (e) {
        console.error(e);
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
}

export async function editPoints(email: string, points: number) {
    try {
        const user = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                points: points,
            },
        });
        return user;
    } catch (err) {
        throw err;
    }
}

export async function getTop5Users() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                points: "desc",
            },
            take: 10,
            select: {
                name: true,
                picture: true,
                points: true,
            },
        });
        return users;
    } catch (err) {
        throw err;
    }
}

export async function SearchUser(query: string) {
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
        });
        return users;
    } catch (err) {
        throw err;
    }
}

export async function GetUserUnder10() {
    try {
        const users = await prisma.user.findMany({
            where: {
                points: {
                    lt: 10
                },
            },
        });
        return users;
    } catch (err) {
        throw err;
    }
}
