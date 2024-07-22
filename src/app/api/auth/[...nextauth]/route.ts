import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { createUser, getUserByEmail } from "@/model/user.model";

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
        async redirect({ url, baseUrl }) {
            // 로그인 성공 시 리다이렉션할 URL을 설정합니다.
            return baseUrl; // 기본적으로 홈 페이지로 리다이렉션
        },
    },
});

export { handler as GET, handler as POST };
