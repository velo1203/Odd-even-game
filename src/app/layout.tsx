import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "./ToastProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "홀짝게임",
    description: "Made by Hosung",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastProvider />
                <div className="main">{children}</div>
            </body>
        </html>
    );
}
