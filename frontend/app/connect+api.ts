export function GET() {
	console.log("first")
	fetch("http://172.21.62.178:3333/")
		.then((res) => {
			if (!res.ok) {
				throw new Error("Connexion non établie")
			}
			console.log("no response OK")
		})
		.then((data) => {
			console.log("Connexion au backend réussie !")
		})
		.catch((error) =>
			console.error("Une erreur s'est produite :", error.message)
		)
}
