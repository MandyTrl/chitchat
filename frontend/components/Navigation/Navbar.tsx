import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { CiSettings, CiLogout } from "react-icons/ci"

export const Navbar = () => {
	const router = useRouter()

	const logout = () => {
		router.push(`/`)
		Cookies.remove("user")
	}

	return (
		<nav className="w-full flex items-center justify-end py-1 px-2 text-3xl text-slate-700">
			<CiSettings className="hover:text-amber-600" />
			<CiLogout className="hover:text-red-500" onClick={logout} />
		</nav>
	)
}
