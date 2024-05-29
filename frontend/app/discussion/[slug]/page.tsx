/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/Navigation/Navbar"
import { ChatBody } from "@/components/ChatBody"
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
	const [typingStatus, setTypingStatus] = useState<string>("")

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
	}, [backUrl, channel])

	useEffect(() => {
		fetchMessages()
	}, [fetchMessages])

	useEffect(() => {
		socket &&
			socket.on("typingResponse", (data) => {
				setTypingStatus(data)
			})
	}, [socket])

	return (
		<main className="w-full h-screen flex flex-col p-4">
			<Navbar />

			<div id="discussion__title" className="flex flex-col w-full text-center">
				<p>Here, we discuss on </p>

				<h1 className="uppercase font-semibold text-[#FBBF24]">{channel}</h1>
			</div>

			<ChatBody
				messages={messages}
				typingStatus={typingStatus}
				username={username}
			/>

			<TextArea
				socketConnexion={socket}
				channel={channel}
				username={username}
				onMessageSent={fetchMessages}
			/>
		</main>
	)
}
