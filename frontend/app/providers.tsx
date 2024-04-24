"use client"
import { ReactNode } from "react"
import { UserProvider } from "@/context/UserProvider"

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		// <ThemeProvider>
		<UserProvider>{children}</UserProvider>
		/* </ThemeProvider> */
	)
}
