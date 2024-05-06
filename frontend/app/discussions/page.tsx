"use client"
import React, { useEffect, useState } from "react"
import socketIOClient, { Socket } from "socket.io-client"
import Cookies from "js-cookie"
import { Navbar } from "@/components/Navigation/Navbar"
import { Channel } from "@/components/UI/Channel"
import { channels, channel } from "@/utils/channels"
import { UserCookiesType } from "@/components/UI/LoginInput"

export default function Discussions() {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const cookiesRaw = Cookies.get("user")
	const userCookie: UserCookiesType | undefined = cookiesRaw
		? JSON.parse(cookiesRaw)
		: undefined

	useEffect(() => {
		if (userCookie) {
			const socket: Socket = socketIOClient(backUrl, {
				auth: { token: userCookie.token, username: userCookie.name },
			})

			socket.once("connect", () => {})
		}
	}, [userCookie])

	return (
		<main className="w-full">
			<Navbar />

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
