import Header from "@/components/Header";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Gallery App",
	description: "Website of Lviv art exhibition",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers
					attribute="class"
					defaultTheme="system"
					enableSystem>
					<Header />
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
