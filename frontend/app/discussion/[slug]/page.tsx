"use client"
import { usePathname } from "next/navigation"

export default function Discussion() {
	const pathname = usePathname()
	const pathnameSplited = pathname.split("/")[2].replace(/%20/g, " ")

	return (
		<main>
			<div id="discussion__title" className="text-center">
				<p>Here, we discuss on </p>

				<h1 className="uppercase font-semibold text-amber-500">
					{pathnameSplited}
				</h1>
			</div>
		</main>
	)
}
