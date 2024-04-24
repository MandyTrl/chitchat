"use client"
import { UserContext } from "@/context"
import { useContext } from "react"

export default function Discussions() {
	const userCtxt = useContext(UserContext)

	return <main>Hello {userCtxt.username}</main>
}
