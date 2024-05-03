"use client"
import { ReactNode } from "react"
import { UserProvider } from "@/context/UserProvider"
import { SocketProvider } from "@/context/SocketProvider"

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		// <ThemeProvider>
		<UserProvider>
			{children}
			{/* <SocketProvider></SocketProvider> */}
		</UserProvider>
		/* </ThemeProvider> */
	)
}
