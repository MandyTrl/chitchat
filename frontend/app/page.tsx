import Image from "next/image"
import { FaCat } from "react-icons/fa"
import { Input } from "@/components/UI/Input"

export default function Home() {
	return (
		<main>
			<h1 className="flex justify-center text-5xl uppercase tracking-wider font-extrabold text-amber-400 my-8 drop-shadow-sm">
				ChitCh
				<FaCat />t
			</h1>

			<Input />
		</main>
	)
}
