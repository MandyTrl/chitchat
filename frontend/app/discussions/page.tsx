/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navigation/Navbar"
import { Chan } from "@/components/UI/Chan"

export type Channel = {
	id: number
	name: string
	lastMsg: string | null
	updateTo: Date | null
}

export default function Discussions() {
	const backUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
	const [channels, setChannels] = useState<Channel[] | []>([])
	const [isLoading, setLoading] = useState(true)

	const fetchChannels = () => {
		fetch(`${backUrl}api/channels`)
			.then((res) => res.json())
			.then((data) => {
				setChannels(data)
				setLoading(false)
			})
	}

	useEffect(() => {
		fetchChannels()
	}, [])

	return (
		<main className="w-full h-full p-4">
			<Navbar />

			<div className="w-full">
				<p className="text-sm ml-1">
					Enter on a discussion or create a new channel
				</p>

				<div
					id="channel__list"
					className="rounded-lg bg-amber-100 p-2 mt-2 shadow-sm">
					{isLoading ? (
						<div>..is loading, be patient</div>
					) : (
						channels.map((channel: Channel, idx: number) => {
							return <Chan key={idx} channel={channel} />
						})
					)}
				</div>
			</div>
		</main>
	)
}
