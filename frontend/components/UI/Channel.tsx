import Link from "next/link"
import { channel } from "../../utils/channels"

type ChannelProps = {
	key: number
	channel: channel
}

export const Channel = ({ channel }: ChannelProps) => {
	return (
		<Link
			href={`discussion/${channel.name.toLocaleLowerCase()}`}
			className="flex items-center first:mt-0 last:mb-0 my-2 rounded-lg bg-white/80 px-3 py-1">
			<div className="w-3 h-3 mr-2 rounded-full bg-amber-500" />

			<div>
				<p className="text-slate-800">{channel.name}</p>
				<p className="text-sm text-gray-500 italic">{channel.lastMsg}</p>
			</div>
		</Link>
	)
}
