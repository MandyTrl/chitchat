"use client"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"
import { useWebSocket } from "@/utils/hooks/useWebSocket"
import { Date } from "@/utils/hooks/useDate"

export type Message = {
	username: string
	msg: string
	dateMsg: Date
}

export default function Discussion() {
	const pathname = usePathname()
	const { socket, username } = useWebSocket()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		if (socket) {
			socket.once(`msgFromChannel${channel}`, ({ user, message, date }) => {
				setMessages([
					...messages,
					{ username: user, msg: message, dateMsg: date },
				])
			})
		}
	}, [messages, channel])

	return (
		<main className="w-full h-screen flex flex-col p-4">
			<Navbar />

			<div id="discussion__title" className="flex flex-col w-full text-center">
				<p>Here, we discuss on </p>

				<h1 className="uppercase font-semibold text-[#FBBF24]">{channel}</h1>
			</div>

			<div
				id="discussion__container"
				className="flex flex-col w-full grow rounded-sm bg-amber-100 p-2 mt-2 shadow-sm overflow-y-scroll">
				{messages.length !== 0 &&
					messages.map((el: Message, idx: number) => {
						const isMe = el.username === username
						const isFirstMsg = idx === 0
						const differentUser =
							!isFirstMsg && el.username !== messages[idx - 1].username

						return (
							<div
								key={idx}
								className={clsx(
									isMe ? "self-end text-right" : "text-left",
									"max-w-4/5 w-fit mx-2"
								)}>
								{(isFirstMsg || differentUser) && (
									<p
										id="discussion__username"
										className="font-semibold text-sm tracking-wider mb-1">
										{isMe ? "You" : el.username}
									</p>
								)}
								<p
									id="discussion__message"
									className={clsx(
										isMe ? "bg-yellow-500/30" : "bg-white/80",
										differentUser ? "my-0" : "my-1",
										"py-1 px-2 rounded-md"
									)}>
									{el.msg}
								</p>

								<p
									id="discussion__date"
									className="text-xs self-center text-slate-700">
									{el.dateMsg.date}
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
