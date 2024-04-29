"use client"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CiHome, CiSettings, CiLogout } from "react-icons/ci"

export const Navbar = () => {
	const router = useRouter()
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
		<nav className="w-full flex items-center justify-between p-3 mb-8 text-slate-800 bg-white border border-amber-500/40 rounded-lg">
			<p className="text-lg">
				<span className="text-xl">👋</span>
				{pseudo}
			</p>

			<div className="flex items-center space-x-4 text-[26px]">
				<Link href={"/discussions"}>
					<CiHome className="hover:text-black" />
				</Link>
				<CiSettings className="hover:text-black" />
				<CiLogout onClick={logout} className="hover:text-black" />
			</div>
		</nav>
	)
}
