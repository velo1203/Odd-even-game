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
