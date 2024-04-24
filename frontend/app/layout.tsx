import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/app/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "ChitChat",
	description: "Discussion's tool",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Providers>
			<html lang="fr">
				<body className="w-screen h-screen flex flex-col items-center justify-center px-4">
					{children}
				</body>
			</html>
		</Providers>
	)
}
