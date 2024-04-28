import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { CiHome, CiSettings, CiLogout } from "react-icons/ci"

export const Navbar = () => {
	const router = useRouter()

	const logout = () => {
		router.push(`/`)
		Cookies.remove("user")
	}

	return (
		<nav className="w-full flex items-center justify-between p-3 mb-4 text-3xl text-amber-100 bg-amber-500/90 rounded-lg shadow-sm ">
			<CiHome className="hover:text-slate-800" />

			<div className="flex items-center space-x-2">
				<CiSettings className="hover:text-slate-800" />
				<CiLogout onClick={logout} className="hover:text-slate-800" />
			</div>
		</nav>
	)
}
