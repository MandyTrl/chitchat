"use client"
import React, { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import socketIOClient, { Socket } from "socket.io-client"
import clsx from "clsx"
import { IoArrowForwardSharp } from "react-icons/io5"
import { UserContext } from "@/context/index"

export const LoginInput = () => {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const userCtxt = useContext(UserContext)
	const router = useRouter()

	const [value, setValue] = useState<string>("")
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const hasCorrectValue = value.length >= 3
	const [socketId, setSocketId] = useState<string | null>(null)

	const connectSocket = () => {
		const socket: Socket = socketIOClient(backUrl)

		socket.on("connect", () => {
			console.log("socket id dans connect socket", socket.id)

			setSocketId(socket.id ?? null)

			//envoie du socket.id au serveur
			socket.emit("connection", socketId)
		})
	}

	// const disconnectSocket = () => {
	// 	const socket = socketIOClient(backUrl)

	// 	if (socketId) {
	// 		socket.emit("disconnect", () => {
	// 			socket.id
	// 		})
	// 		setSocketId(null)
	// 	}
	// }
	const handleSubmit = (
		e:
			| React.KeyboardEvent<HTMLInputElement>
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		if (!socketId) {
			connectSocket()
		}

		Cookies.set("user", JSON.stringify({ name: value, socketId }), {
			expires: 7,
		})

		userCtxt.setUsername(value)

		router.push(`/discussions`)
	}

	const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value.replace(/\s/g, ""))
		setIsFocused(true)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && hasCorrectValue) {
			handleSubmit(e)
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
						onKeyUp={(e) => handleKeyPress(e)}
						className="group px-2 py-1 bg-transparent focus:outline-0"
					/>

					<Link
						href={hasCorrectValue ? "/discussions" : ""}
						onClick={(e) => handleSubmit(e)}>
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
