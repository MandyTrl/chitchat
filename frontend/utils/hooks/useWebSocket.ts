"use client"
import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import { UserCookiesType } from "@/components/UI/LoginInput"

export const useWebSocket = () => {
	const isBrowser = typeof window !== "undefined"
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

	const [username, setUsername] = useState<string | null>(null)

	const cookiesRaw = Cookies.get("user")
	const userCookie: UserCookiesType = cookiesRaw && JSON.parse(cookiesRaw)

	const socket: Socket | null = isBrowser
		? socketIOClient(backUrl, {
				auth: { token: userCookie.token, username: userCookie.name },
		  })
		: null

	useEffect(() => {
		if (userCookie && socket) {
			setUsername(userCookie.name)
			socket.once("connect", () => {})
		}
	}, [])

	return { socket, username }
}
