"use client"
import { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import { UserCookiesType } from "@/components/UI/LoginInput"

export const useWebSocket = () => {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const isBrowser = typeof window !== "undefined"

	const [username, setUsername] = useState<string | null>(null)
	const [socket, setSocket] = useState<Socket | null>(null)

	const cookiesRaw = Cookies.get("user")
	const userCookie: UserCookiesType = cookiesRaw && JSON.parse(cookiesRaw)

	useEffect(() => {
		if (isBrowser && userCookie) {
			const socketInstance = socketIOClient(backUrl, {
				auth: { token: userCookie.token, username: userCookie.name },
			})

			setSocket(socketInstance)
			setUsername(userCookie.name)

			socketInstance.once("connect", () => {})

			// clean up on unmount
			return () => {
				socketInstance.disconnect()
			}
		}
	}, [backUrl])

	return { socket, username }
}
