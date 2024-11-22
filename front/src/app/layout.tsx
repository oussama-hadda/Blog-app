import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import React from "react";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Travel",
    description: 'Discover your next adventure',
    icons: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: '/favicon.svg',
        },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <body className="antialiased">
        <div className="p-2">
            {children}
            <Footer/>
        </div>
        </body>
        </html>
    );
}
