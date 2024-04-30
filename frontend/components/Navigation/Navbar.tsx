"use client"
import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Cookies from "js-cookie"
import Link from "next/link"
import { CiHome, CiSettings, CiLogout } from "react-icons/ci"
import clsx from "clsx"

export const Navbar = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [pseudo, setPseudo] = useState<string>("")

	// const disconnectSocket = () => {
	// 	const socket = socketIOClient(backUrl)

	// 	if (socketId) {
	// 		socket.emit("disconnect", () => {
	// 			socket.id
	// 		})
	// 		setSocketId(null)
	// 	}
	// }

	useEffect(() => {
		const userCookie = Cookies.get("user")
		if (userCookie) {
			const userData = JSON.parse(userCookie)
			setPseudo(userData.name)
		}
	}, [])

	const logout = () => {
		router.push(`/`)
		Cookies.remove("user")
	}

	return (
		<nav className="w-full flex items-center justify-between p-2 mb-8 text-slate-800 bg-white">
			<p className="text-lg">
				<span className="text-xl">👋</span>
				{pseudo}
			</p>

			<div className="w-fit flex justify-between items-center p-2 text-[26px] bg-amber-300/20 rounded-full">
				<Link
					href={"/discussions"}
					className={clsx(
						pathname === "/discussions" && "bg-amber-400/20",
						"p-2 rounded-full hover:bg-amber-400/20 hover:text-black"
					)}>
					<CiHome />
				</Link>

				<div className="hover:bg-amber-400/20 hover:text-black p-2 rounded-full">
					<CiSettings />
				</div>

				<div className="hover:bg-amber-400/20 hover:text-black p-2 rounded-full">
					<CiLogout onClick={logout} />
				</div>
			</div>
		</nav>
	)
}
