"use client"
import React, { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import clsx from "clsx"
import { IoArrowForwardSharp } from "react-icons/io5"
import { useWebSocket } from "@/context/SocketProvider"
import { UserContext } from "@/context/UserProvider"

export const LoginInput = () => {
	const router = useRouter()
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const socket: Socket = socketIOClient(backUrl)
	const { setUsername } = useContext(UserContext)

	const [value, setValue] = useState<string>("")
	const [token, setToken] = useState<string | null>(null)
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const hasCorrectValue = value.length >= 3

	const connectSocket = () => {
		socket.once("connect", () => {
			if (socket.id && value) {
				const token = `${socket.id} | ${value}`
				setToken(token)

				Cookies.set("user", JSON.stringify({ name: value, token }), {
					expires: 7,
				})

				socket.emit("auth", { token: token, username: value })
			}
		})
	}
	const handleSubmit = () => {
		connectSocket()

		setUsername(value)

		router.push(`/discussions`)
	}

	const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value.replace(/\s/g, ""))
		setIsFocused(true)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && hasCorrectValue) {
			e.preventDefault()

			handleSubmit()
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label className="flex flex-col items-center justify-center">
				What&apos;s your name ?
				<div
					className={clsx(
						isFocused && hasCorrectValue
							? "border-green-500"
							: isFocused
							? "border-amber-400 shadow-inner"
							: "border-transparent",
						"flex items-center rounded-full mt-2 px-[6px] py-1 bg-amber-100/60 border-2"
					)}
					onClick={() => setIsFocused(true)}
					onMouseLeave={() => setIsFocused(false)}>
					<input
						name="pseudo"
						value={value}
						placeholder="Choose a pseudo"
						type="text"
						required
						minLength={3}
						onClick={() => setIsFocused(true)}
						onMouseLeave={() => setIsFocused(false)}
						onChange={(e) => handleFocus(e)}
						onKeyDown={(e) => handleKeyPress(e)}
						className="group px-2 py-1 bg-transparent focus:outline-0"
					/>

					<Link
						href={hasCorrectValue ? "/discussions" : ""}
						onClick={handleSubmit}>
						<IoArrowForwardSharp
							className={clsx(
								hasCorrectValue
									? "bg-white text-green-500"
									: "bg-white/80 text-amber-400",
								"rounded-full p-1 text-3xl"
							)}
						/>
					</Link>
				</div>
			</label>
		</form>
	)
}
