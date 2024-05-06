"use client"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"
import { useWebSocket } from "@/utils/hooks/useWebSocket"

export default function Discussion() {
	const pathname = usePathname()
	const { socket, username } = useWebSocket()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const socketChannel = channel === "board game" ? "boardgame" : channel
	const [msg, setMsg] = useState<string>("")

	useEffect(() => {
		if (socket) {
			socket.once(`msgFromChannel${socketChannel}`, ({ user, message }) => {
				setMsg(`${user} : ${msg}`)
			})
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
				username={username}
			/>
		</main>
	)
}
