import clsx from "clsx"
import { Message } from "@/app/discussion/[slug]/page"
import { formateDate } from "@/utils/utils"

type ChatBodyProps = {
	messages: Message[]
	typingStatus: string
	username: string | null
}

export const ChatBody = ({
	messages,
	typingStatus,
	username,
}: ChatBodyProps) => {
	return (
		<div
			id="discussion__container"
			className="flex flex-col w-full justify-between grow rounded-sm bg-amber-100 p-2 mt-2 shadow-sm overflow-y-scroll">
			{messages.length !== 0 &&
				messages.map((el: Message, idx: number) => {
					const isMe = el.username === username
					const isFirstMsg = idx === 0
					const differentUser =
						!isFirstMsg && el.username !== messages[idx - 1].username
					const nextMsg = messages[idx + 1]
					const isLastMsgOfDay = !nextMsg || nextMsg.date.day !== el.date.day
					const isToday = el.date.day === formateDate().day
					const isYesterday = el.date.day === formateDate().day - 1
					const displayDate = isYesterday ? "Yesterday" : el.date.fulldate

					return (
						<div key={idx} className="flex flex-col w-full">
							<div
								className={clsx(
									isMe ? "self-end text-right" : "text-left",
									"flex flex-col flex flex-col max-w-4/5 w-fit m-2"
								)}>
								{(isFirstMsg || differentUser) && (
									<p
										id="discussion__username"
										className="font-semibold text-sm tracking-wider mb-1">
										{isMe ? "You" : el.username}
									</p>
								)}
								<p
									id="discussion__message"
									className={clsx(
										isMe ? "bg-yellow-500/30" : "bg-white/80",
										differentUser ? "my-0" : "my-1",
										"py-1 px-2 rounded-md"
									)}>
									{el.msg}
								</p>

								{isLastMsgOfDay && !isToday && (
									<p
										id="discussion__fulldate"
										className="w-fit py-[2px] px-2 mt-8 mb-1 text-xs self-center text-slate-700 bg-white/80 rounded-md border-dashed border-[0.5px] border-slate-300">
										{displayDate}
									</p>
								)}
							</div>
						</div>
					)
				})}
			{typingStatus !== "" && (
				<p className="text-xs slate-400 semibold animate-pulse">
					{typingStatus}
				</p>
			)}
		</div>
	)
}
