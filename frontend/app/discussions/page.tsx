"use client"
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Navbar } from "@/components/Navigation/Navbar"
import { Channel } from "@/components/UI/Channel"
import { channels, channel } from "@/utils/channels"

export default function Discussions() {
	const [pseudo, setPseudo] = useState<string>("")

	useEffect(() => {
		const userCookie = Cookies.get("user")
		if (userCookie) {
			const userData = JSON.parse(userCookie)
			setPseudo(userData.name)
		}
	}, [])

	return (
		<main className="w-full">
			<Navbar />

			<p className="text-xl my-8 text-left ml-1">
				<span className="text-2xl">👋</span>
				{pseudo}
			</p>

			<div className="w-full">
				<p className="text-sm ml-1">
					Enter on a discussion or create a new channel
				</p>

				<div
					id="channel__list"
					className="rounded-lg bg-amber-100/70 p-2 mt-2 shadow-sm">
					{channels.map((channel: channel, idx: number) => {
						return <Channel key={idx} channel={channel} />
					})}
				</div>
			</div>
		</main>
	)
}
