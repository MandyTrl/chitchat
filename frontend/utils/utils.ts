export type DateMsg = {
	day: number
	fulldate: string
	time: string
}

export const formateDate = (dateMsg?: string) => {
	const dateObj = dateMsg ? new Date(dateMsg) : new Date()

	const day = dateObj.getDate()
	const month = dateObj.toLocaleString("fr-FR", {
		month: "short",
	})
	const year = dateObj.getFullYear()
	const hours = dateObj.getHours().toString().padStart(2, "0") // ajoute un zéro devant si nécessaire
	const minutes = dateObj.getMinutes().toString().padStart(2, "0") //ajoute un zéro devant si nécessaire
	const time = hours + "h" + minutes

	return {
		day: day,
		fulldate: day + " " + month + " " + year,
		time: time,
	}
}
