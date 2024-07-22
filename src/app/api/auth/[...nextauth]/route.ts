import { createUser, getUserByEmail } from "@/model/user.model";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }: any) {
            if (
                account.provider === "google" &&
                profile.email_verified &&
                profile.email.endsWith("@dimigo.hs.kr")
            ) {
                if (profile.email == "seungchanoh0923@dimigo.hs.kr") {
                    return false;
                }
                const user = await getUserByEmail(profile.email);
                if (!user) {
                    await createUser({
                        name: profile.name,
                        picture: profile.picture,
                        email: profile.email,
                    });
                }
                return true;
            }
            return false;
        },
    },
});

export { handler as GET, handler as POST };
