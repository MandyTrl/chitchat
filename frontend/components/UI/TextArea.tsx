"use client"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import clsx from "clsx"
import { IoArrowForwardSharp } from "react-icons/io5"
import { UserCookiesType } from "./LoginInput"

type TextAreaPropsType = {
	socketConnexion: Socket | null
	channel: string
	username: string | null
	onMessageSent: () => void
}

export const TextArea = ({
	socketConnexion,
	channel,
	username,
	onMessageSent,
}: TextAreaPropsType) => {
	const cookiesRaw = Cookies.get("user")
	const userCookie: UserCookiesType = cookiesRaw && JSON.parse(cookiesRaw)
	const [value, setValue] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
		null
	)

	const handleTyping = () => {
		if (socketConnexion) {
			socketConnexion.emit("typing", `${userCookie.name} is typing..`)

			if (typingTimeout) {
				clearTimeout(typingTimeout)
			}

			//handle when user is not typing after 6s
			const timeout = setTimeout(() => {
				socketConnexion.emit("typing", "")
			}, 6000)

			setTypingTimeout(timeout)
		}
	}
	const sendSocketMsg = () => {
		if (socketConnexion) {
			socketConnexion.emit(`msgSended${channel}`, {
				message: {
					username: username,
					msg: value,
					date: new Date(),
				},
			})
			onMessageSent()
		}
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
			className="w-full h-fit flex items-center justify-between rounded-xl bg-amber-100 p-2 mt-2 shadow-sm">
			<textarea
				name="message"
				value={value}
				placeholder="Message"
				rows={1}
				onClick={() => setIsFocused(true)}
				onMouseLeave={() => setIsFocused(false)}
				onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
					setValue(e.target.value)
				}
				onKeyUp={handleTyping}
				className="w-full group px-2 py-1 bg-transparent focus:outline-0"
			/>

			<button
				className={clsx(
					!isFocused ? "opacity-0" : "opacity-100",
					"w-fit bg-white/80 text-amber-400 rounded-full p-1 text-3xl"
				)}
				type="submit"
				onClick={() => handleSubmit}>
				<IoArrowForwardSharp className="text-xl" />
			</button>
		</form>
	)
}
