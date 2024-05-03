"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Cookies from "js-cookie"
import { useWebSocket } from "@/context/SocketProvider"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"

export default function Discussion() {
	const socket = useWebSocket()
	const userCookie = Cookies.get("user")
	const sessionID = localStorage.getItem("sessionID")

	const pathname = usePathname()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const socketChannel = channel === "board game" ? "boardgame" : channel

	const [socketId, setSocketId] = useState<string | null>(null)
	const [username, setUsername] = useState<string | null>(null)
	const [msg, setMsg] = useState<string>("")

	useEffect(() => {
		// if (userCookie) {
		// 	const userData = JSON.parse(userCookie)
		// 	setUsername(userData.name)
		// 	setSocketId(userData.socketId)
		// }

		if (sessionID) {
			socket.auth = { sessionID }
			socket.connect()
		}

		socket.on(`msgFromChannel${socketChannel}`, ({ user, message }) => {
			console.log("coucou", user, message)
			setMsg(`${user} : ${message}`)
		})

		return () => {
			socket.off(`msgFromChannel${socketChannel}`)
		}
	}, [msg, socketChannel])

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
				{msg !== "" && (
					<p className="bg-white/80 py-1 px-2 rounded-md">{msg}</p>
				)}
			</div>

			<TextArea
				socketConnexion={socket}
				channel={channel}
				socketId={socketId}
				username={username}
			/>
		</main>
	)
}
