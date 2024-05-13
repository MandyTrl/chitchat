"use client"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"
import { useWebSocket } from "@/utils/hooks/useWebSocket"

export type MsgType = {
	username: string
	msg: string
}

export default function Discussion() {
	const pathname = usePathname()
	const { socket, username } = useWebSocket()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const [messages, setMessages] = useState<MsgType[]>([])

	useEffect(() => {
		if (socket) {
			socket.once(`msgFromChannel${channel}`, ({ user, message }) => {
				setMessages([...messages, { username: user, msg: message }])
			})
		}
	}, [messages, channel])

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
				{messages.length !== 0 &&
					messages.map((el: MsgType, idx: number) => {
						const isMe = el.username === username
						const isFirstMsg = idx === 0
						const differentUser =
							!isFirstMsg && el.username !== messages[idx - 1].username

						return (
							<div
								key={idx}
								className={clsx(isMe ? "text-right" : "text-left", "mx-2")}>
								{(isFirstMsg || differentUser) && (
									<p className="font-semibold  mb-1">{el.username}</p>
								)}
								<p
									className={clsx(
										isMe ? "bg-white/80" : "bg-amber-100",
										differentUser ? "my-0" : "my-1",
										"py-1 px-2 rounded-md"
									)}>
									{el.msg}
								</p>
							</div>
						)
					})}
			</div>

			<TextArea
				socketConnexion={socket}
				channel={channel}
				username={username}
			/>
		</main>
	)
}
