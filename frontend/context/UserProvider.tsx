import React, { useState, ReactNode, createContext } from "react"

type UserContextType = {
	username: string
	setUsername: (username: string) => void
}

type UserProviderProps = {
	children: ReactNode
}

export const UserContext = createContext<UserContextType>({
	username: "",
	setUsername: () => {},
})

export const UserProvider = ({ children }: UserProviderProps) => {
	const [username, setUsername] = useState<string>("")

	return (
		<UserContext.Provider value={{ username, setUsername }}>
			{children}
		</UserContext.Provider>
	)
}
