import { FaCat } from "react-icons/fa"
import { LoginInput } from "@/components/UI/LoginInput"

export default function Home() {
	return (
		<main
			id="login"
			className="w-full h-screen flex flex-col justify-center p-4">
			<h1 className="flex justify-center text-5xl uppercase tracking-wider font-extrabold text-amber-400 my-8 drop-shadow-sm">
				ChitCh
				<FaCat />t
			</h1>

			<LoginInput />
		</main>
	)
}
