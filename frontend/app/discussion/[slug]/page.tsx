"use client"
import { usePathname } from "next/navigation"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"
import { useEffect, useState } from "react"

export default function Discussion() {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const socket: Socket = socketIOClient(backUrl)
	const userCookie = Cookies.get("user")

	const pathname = usePathname()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const socketChannel = channel === "board game" ? "boardgame" : channel

	const [socketId, setSocketId] = useState<string | null>(null)
	const [username, setUsername] = useState<string | null>(null)
	const [newMsgHasBeenSent, setNewMsgHasBeenSent] = useState<boolean>(false)
	const [msg, setMsg] = useState<string>("")

	useEffect(() => {
		if (userCookie) {
			const userData = JSON.parse(userCookie)
			setUsername(userData.username)
			setSocketId(userData.socketId)
		}

		socket.on(`msgFromChannel${socketChannel}`, (newMsg) => {
			console.log("coucou", newMsg)

			setMsg(newMsg)
			setNewMsgHasBeenSent(false)
		})

		return () => {
			socket.off(`msgFromChannel${socketChannel}`)
		}
	}, [newMsgHasBeenSent, msg, socketChannel])

	return (
		<main className="w-full h-screen">
			<Navbar />

			<div id="discussion__title" className="text-center">
				<p>Here, we discuss on </p>

				<h1 className="uppercase font-semibold text-amber-500">{channel}</h1>
			</div>

			<div
				id="discussion__container"
				className="w-full h-4/5 rounded-sm bg-amber-100/70 p-2 mt-2 shadow-sm overflow-y-scroll">
				{msg}
			</div>

			<TextArea
				socketConnexion={socket}
				channel={channel}
				socketId={socketId}
				username={username}
				setAction={setNewMsgHasBeenSent}
			/>
		</main>
	)
}
