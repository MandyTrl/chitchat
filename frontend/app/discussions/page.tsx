"use client"
import { useContext, useEffect, useState } from "react"
import socketIOClient from "socket.io-client"
import { UserContext } from "@/context"
import { Channel } from "@/components/UI/Channel"
import { channels, channel } from "@/utils/channels"

export default function Discussions() {
	const userCtxt = useContext(UserContext)
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const socket = socketIOClient(backUrl)
	const [socketUserConnection, setSocketUserConnection] = useState<any>(null)

	const connectSocket = () => {
		setSocketUserConnection(socket)
		socket.emit("connection", () => {
			socket.id
		})
	}

	const disconnectSocket = () => {
		if (socketUserConnection) {
			socketUserConnection.emit("disconnect", () => {
				socket.id
			})
			setSocketUserConnection(null)
		}
	}

	useEffect(() => {
		connectSocket()

		return () => {
			disconnectSocket()
		}
	}, [socketUserConnection])

	return (
		<main className="w-full">
			<p className="text-lg">
				<span className="text-xl">👋 </span>
				{userCtxt.username}
			</p>

			<div className="w-full mt-4">
				<p className="text-sm">Enter on a discussion or create a new channel</p>

				<div
					id="channel__list"
					className="rounded-lg bg-amber-100/70 p-2 mt-2 shadow-sm">
					{channels.map((channel: channel, idx: number) => {
						return <Channel key={idx} channel={channel} />
					})}
				</div>
			</div>
		</main>
	)
}
