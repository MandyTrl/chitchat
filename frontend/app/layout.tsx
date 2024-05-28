import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "ChitChat",
	description: "Discussion's tool",
	icons: {
		icon: "./public/assets/favicon.png",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="fr">
			<body className="w-screen h-full flex flex-col items-center justify-center">
				{children}
			</body>
		</html>
	)
}
