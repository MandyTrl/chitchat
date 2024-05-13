import Link from "next/link"
import { Channel } from "@/app/discussions/page"

type ChannelProps = {
	key: number
	channel: Channel
}

export const Chan = ({ channel }: ChannelProps) => {
	const channelName = channel.name === "boardgame" ? "board game" : channel.name

	return (
		<Link
			href={`discussion/${channelName}`}
			className="flex items-center first:mt-0 last:mb-0 my-2 rounded-lg bg-white/80 px-3 py-1">
			<div className="w-3 h-3 mr-2 rounded-full bg-amber-500" />

			<div>
				<p className="text-slate-800 capitalize">{channelName}</p>
				<p className="text-sm text-gray-500 italic">{channel.lastMsg}</p>
			</div>
		</Link>
	)
}
