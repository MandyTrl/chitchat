"use client"
import { useEffect, useState } from "react"

export type Date = {
	date: string
	time: string
}

export const useDate = () => {
	const [date, setDate] = useState<Date | null>(null)

	useEffect(() => {
		const today = new Date()
		const day = today.getDate()
		const month = today.toLocaleString("fr-FR", {
			month: "short",
		})
		const year = today.getFullYear()
		const hours = today.getHours().toString().padStart(2, "0") // ajoute un zéro devant si nécessaire
		const minutes = today.getMinutes().toString().padStart(2, "0") //ajoute un zéro devant si nécessaire
		const time = hours + "h" + minutes

		setDate({
			date: day + " " + month + " " + year,
			time: time,
		})
	}, [])

	return date
}
