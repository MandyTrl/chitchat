const fs = require("fs") // module intégré à node qui permet de lire et d'écrire des fichiers
const path = require("path") // module intégré à node qui permet de faire des action sur les chemins des fichiers

//récupére tous les channels
exports.getMessagesFromChannel = (req, res) => {
	const channel = req.params.channel

	const channelFilePath = path.join("datas", "messages", `${channel}.json`)

	fs.readFile(channelFilePath, "utf8", (err, data) => {
		if (err) {
			console.error("⚠️ Erreur lors de la lecture du fichier JSON:", err)
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des messages." })
			return
		}

		// envoi les données JSON en réponse
		res.json(JSON.parse(data))
	})
}

//mets à jour les messages par channel dès qu'un message est reçu
exports.updateMessages = async (channelName, message) => {
	const channelFilePath = path.join("datas", "messages", `${channelName}.json`)

	try {
		// lis le fichier JSON existant
		const data = await fs.promises.readFile(channelFilePath, "utf8")
		let messages = data ? JSON.parse(data) : []

		// ajoute le nouveau message à la liste des messages
		messages.push(message)

		// ré-écris dans le fichier avec tous les messages
		await fs.promises.writeFile(channelFilePath, JSON.stringify(messages))
		console.log("Le fichier JSON a été mis à jour avec succès.")
	} catch (err) {
		console.error("⚠️ Erreur lors de la mise à jour des messages:", err)
		throw err
	}
}
