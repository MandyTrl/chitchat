"use client"
import React, { Dispatch, SetStateAction, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import { IoArrowForwardSharp } from "react-icons/io5"
import clsx from "clsx"

type TextAreaPropsType = {
	socketConnexion: Socket
	channel: string
	username: string | null
	socketId: string | null
	setAction: Dispatch<SetStateAction<boolean>>
}

export const TextArea = ({
	socketConnexion,
	channel,
	username,
	socketId,
	setAction,
}: TextAreaPropsType) => {
	const [message, setMessage] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value)
	}

	const sendSocketMsg = () => {
		socketConnexion.emit(`msgSended${channel}`, socketId, message)
		setAction(true)
	}

	// `from ${userCtxt.username} :

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		sendSocketMsg()
		setMessage("")
	}

	return (
		<form
			id="discussion__input"
			onSubmit={handleSubmit}
			className="w-full h-fit flex items-center justify-between rounded-xl bg-amber-100/70 p-2 mt-2 shadow-sm">
			<textarea
				name="message"
				value={message}
				placeholder="Message"
				rows={1}
				onClick={() => setIsFocused(true)}
				onMouseLeave={() => setIsFocused(false)}
				onChange={handleChange}
				className="w-full group px-2 py-1 bg-transparent focus:outline-0"
			/>

			<button
				className={clsx(
					!isFocused ? "opacity-0" : "opacity-100",
					"w-fit bg-white/80 text-amber-400 rounded-full p-1 text-3xl"
				)}
				onClick={() => handleSubmit}>
				<IoArrowForwardSharp className="text-xl" />
			</button>
		</form>
	)
}
