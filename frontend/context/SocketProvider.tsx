import React, { ReactNode, createContext, useEffect, useContext } from "react"
import socketIOClient, { Socket } from "socket.io-client"

type WebSocketProviderProps = {
	children: ReactNode
}

export const WebSocketContext = createContext<Socket | null>(null)

export const SocketProvider = ({ children }: WebSocketProviderProps) => {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const socket: Socket = socketIOClient(backUrl)

	useEffect(() => {
		// déconnexion du socket lorsque le composant est démonté
		return () => {
			socket.disconnect()
		}
	}, [socket])

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	)
}

// utilisation du ctxt
export const useWebSocket = () => {
	const socket = useContext(WebSocketContext)
	if (!socket) {
		throw new Error("useWebSocket must be used within a SocketProvider")
	}
	return socket
}
