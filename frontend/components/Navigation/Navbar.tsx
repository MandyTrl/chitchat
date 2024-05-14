import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Cookies from "js-cookie"
import clsx from "clsx"
import { FaCat } from "react-icons/fa"
import { CiHome, CiSettings, CiLogout } from "react-icons/ci"

export const Navbar = () => {
	const router = useRouter()
	const pathname = usePathname()

	// const disconnectSocket = () => {
	// 	const socket = socketIOClient(backUrl)

	// 	if (socketId) {
	// 		socket.emit("disconnect", () => {
	// 			socket.id
	// 		})
	// 		setSocketId(null)
	// 	}
	// }

	const logout = () => {
		router.push(`/`)
		Cookies.remove("user")
	}

	return (
		<nav className="w-full flex items-center justify-between p-2 mb-8 text-slate-800 bg-transparent">
			<p
				id="navbar__logo"
				className="flex justify-center text-2xl uppercase tracking-wider font-extrabold text-amber-400 drop-shadow-sm">
				ChitCh
				<FaCat />t
			</p>

			<div className="w-fit flex justify-between items-center p-2 text-[26px] bg-amber-100 rounded-full">
				<Link
					href={"/discussions"}
					className={clsx(
						pathname === "/discussions" && "bg-amber-400/30",
						"p-2 rounded-full hover:bg-amber-400/20 hover:text-black"
					)}>
					<CiHome />
				</Link>

				<div className="hover:bg-amber-400/20 hover:text-black p-2 rounded-full">
					<CiSettings />
				</div>

				<div className="hover:bg-amber-400/20 hover:text-black p-2 rounded-full">
					<CiLogout onClick={logout} />
				</div>
			</div>
		</nav>
	)
}
