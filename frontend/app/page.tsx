import Image from "next/image"
import { FaCat } from "react-icons/fa"
import { LoginInput } from "@/components/UI/LoginInput"

export default function Home() {
	return (
		<main className="h-screen flex flex-col justify-center ">
			<h1 className="flex justify-center text-5xl uppercase tracking-wider font-extrabold text-amber-400 my-8 drop-shadow-sm">
				ChitCh
				<FaCat />t
			</h1>

			<LoginInput />
		</main>
	)
}
