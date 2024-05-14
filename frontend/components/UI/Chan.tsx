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
			className="flex flex-col first:mt-0 last:mb-0 my-2 rounded-md bg-white/80 px-3 py-1">
			<div className="flex items-center">
				<div className="w-2 h-2 mr-2 rounded-full bg-amber-500" />
				<p className="text-slate-800 capitalize">{channelName}</p>
			</div>

			<p className="ml-4 text-sm text-gray-500 italic">{channel.lastMsg}</p>
		</Link>
	)
}
