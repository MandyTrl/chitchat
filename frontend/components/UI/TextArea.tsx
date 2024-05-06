"use client"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Socket } from "socket.io-client"
import { IoArrowForwardSharp } from "react-icons/io5"
import clsx from "clsx"

type TextAreaPropsType = {
	socketConnexion: Socket | null
	channel: string
	username: string | null
}

export const TextArea = ({
	socketConnexion,
	channel,
	username,
}: TextAreaPropsType) => {
	const [value, setValue] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value)
	}

	const sendSocketMsg = () => {
		socketConnexion &&
			socketConnexion.emit(`msgSended${channel}`, {
				user: username,
				message: value,
			})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		value !== "" && sendSocketMsg()
		setValue("")
	}

	return (
		<form
			id="discussion__input"
			onSubmit={handleSubmit}
			className="w-full h-fit flex items-center justify-between rounded-xl bg-amber-100/70 p-2 mt-2 shadow-sm">
			<textarea
				name="message"
				value={value}
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
