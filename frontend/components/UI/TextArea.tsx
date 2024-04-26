"use client"
import React, { useEffect, useContext, useState } from "react"
import socketIOClient from "socket.io-client"
import { UserContext } from "@/context"

export const TextArea = () => {
	const userCtxt = useContext(UserContext)
	const [value, setValue] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const socket = socketIOClient(backUrl)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// socket.emit("msgSended", socket.id, value)
		setValue("")
	}

	// `from ${userCtxt.username} :

	return (
		<form
			id="discussion__input"
			onSubmit={handleSubmit}
			className="w-full h-fit rounded-lg bg-amber-100/70 p-2 mt-2 shadow-sm">
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
		</form>
	)
}
