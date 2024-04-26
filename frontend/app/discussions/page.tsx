"use client"
import { useContext } from "react"
import { UserContext } from "@/context"
import { Channel } from "@/components/UI/Channel"
import { channels, channel } from "@/utils/channels"

export default function Discussions() {
	const userCtxt = useContext(UserContext)

	return (
		<main className="w-full">
			<p className="text-lg">
				<span className="text-xl">👋 </span>
				{userCtxt.username}
			</p>

			<div className="w-full mt-4">
				<p className="text-sm">Enter on a discussion or create a new channel</p>

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
