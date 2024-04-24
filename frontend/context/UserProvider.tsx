import React, { useState, ReactNode } from "react"
import { UserContext } from "./index"

type UserProviderProps = {
	children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
	const [username, setUsername] = useState<string>("")

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{children}
		</UserContext.Provider>
	)
}
