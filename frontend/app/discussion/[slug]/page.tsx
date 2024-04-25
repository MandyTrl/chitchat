"use client"
import { usePathname } from "next/navigation"
import { TextArea } from "@/components/UI/TextArea"

export default function Discussion() {
	const pathname = usePathname()
	const pathnameSplited = pathname.split("/")[2].replace(/%20/g, " ")

	return (
		<main className="w-full h-screen">
			<div id="discussion__title" className="text-center">
				<p>Here, we discuss on </p>

				<h1 className="uppercase font-semibold text-amber-500">
					{pathnameSplited}
				</h1>
			</div>

			<div
				id="discussion__container"
				className="w-full h-4/5 rounded-lg bg-amber-100/70 p-2 mt-2 shadow-sm"></div>

			<TextArea />
		</main>
	)
}
