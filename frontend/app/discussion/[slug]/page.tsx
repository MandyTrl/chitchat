/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { Navbar } from "@/components/Navigation/Navbar"
import { TextArea } from "@/components/UI/TextArea"
import { useWebSocket } from "@/utils/hooks/useWebSocket"
import { formateDate, DateMsg } from "@/utils/utils"

export type MessageFromBack = {
	username: string
	msg: string
	date: string
}

export type Message = {
	username: string
	msg: string
	date: DateMsg
}

export default function Discussion() {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const pathname = usePathname()
	const { socket, username } = useWebSocket()
	const channel = pathname.split("/")[2].replace(/%20/g, " ")
	const [messages, setMessages] = useState<Message[]>([])

	const fetchMessages = useCallback(() => {
		fetch(`${backUrl}api/messages/${channel}`)
			.then((res) => res.json())
			.then((messages) => {
				const formatedMsg = messages.map((msg: MessageFromBack) => ({
					username: msg.username,
					msg: msg.msg,
					date: formateDate(msg.date),
				}))
				return setMessages(formatedMsg)
			})
	}, [])

	useEffect(() => {
		fetchMessages()

		// if (socket) {
		// 	socket.once(`msgFromChannel${channel}`, ({ message }) => {
		// 		setMessages([
		// 			...messages,
		// 			{ username: message.user, msg: message.msg, dateMsg: message.date },
		// 		])
		// 	})
		// }
	}, [fetchMessages])

	let previousDate = ""

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
						const nextMsg = messages[idx + 1]
						const isLastMsgOfDay = !nextMsg || nextMsg.date.day !== el.date.day
						const isToday = el.date.day === formateDate().day
						const isYesterday = el.date.day === formateDate().day - 1
						const displayDate = isYesterday ? "Yesterday" : el.date.fulldate

						return (
							<div key={idx} className="w-full">
								<div
									className={clsx(
										isMe ? "self-end text-right" : "text-left",
										"flex flex-col flex flex-col max-w-4/5 w-fit m-2"
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

									{isLastMsgOfDay && !isToday && (
										<p
											id="discussion__fulldate"
											className="w-fit py-[2px] px-2 mt-8 mb-1 text-xs self-center text-slate-700 bg-white/80 rounded-md border-dashed border-[0.5px] border-slate-300">
											{displayDate}
										</p>
									)}
								</div>
							</div>
						)
					})}
			</div>

			<TextArea
				socketConnexion={socket}
				channel={channel}
				username={username}
				onMessageSent={fetchMessages}
			/>
		</main>
	)
}
