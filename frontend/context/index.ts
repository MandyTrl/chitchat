import React, { createContext, useState, ReactNode } from "react"

type UserContextType = {
	username: string
	setUsername: (username: string) => void
}

export const UserContext = createContext<UserContextType>({
	username: "",
	setUsername: () => {},
})
