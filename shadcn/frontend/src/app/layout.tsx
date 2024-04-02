import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "next-themes"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Void Pixel",
    description: "Generated by create next app",
};


export default function RootLayout({
    children,
}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
} 
