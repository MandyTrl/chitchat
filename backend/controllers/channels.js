const fs = require("fs") // module intégré à node qui permet de lire et d'écrire des fichiers
const path = require("path") // module intégré à node qui permet de faire des action sur les chemins des fichiers

exports.addChannel = async (req, res) => {
	try {
		const bookFromFront = JSON.parse(req.body.book) //on parse notre réponse reçue sous format json

		delete bookFromFront.userId //sera modifié par le token d'authentification pour plus de sécurité

		//création du livre en modifiant le "userId" et l'"imageUrl"
		const book = new Book({
			...bookFromFront,
			userId: req.auth.userId, //on assigne le token d'authentification au userId
			imageUrl: `${req.protocol}://${req.get(
				"host"
			)}/images/resized-${req.file.filename.replace(/\.[^.]*$/, "")}.webp`, //définit la nouvelle url
		})

		await book.save() //sauvegarde le livre en BDD

		res.status(201).json({
			message: "Livre ajouté à la BDD !",
		})
	} catch (error) {
		res.status(400).json({ error })
		console.error(
			chalk.bold("|", chalk.red("!"), "|") +
				"Book " +
				chalk.underline("addBook") +
				" error : ",
			error
		)
	}
}

//récupére tous les channels
exports.getChannels = (req, res) => {
	fs.readFile("./datas/channels.json", "utf8", (err, data) => {
		if (err) {
			console.error("Error reading channels:", err)
			res.status(500).json({ error: "Error reading channels" })
			return
		}

		res.status(200).json(JSON.parse(data))
	})
}

//mets à jour les derniers messages dans le fichier "channels"
exports.updateLastMsgInChannelList = (channelName) => {
	const channelFilePath = path.join("datas", "messages", `${channelName}.json`)

	let lastMessage = ""

	fs.readFile(channelFilePath, "utf8", (err, data) => {
		if (err) {
			console.error("Erreur lors de la lecture du fichier JSON du canal :", err)
			return
		}

		let channelMessages = []
		if (data) {
			channelMessages = JSON.parse(data)
		}

		lastMessage = channelMessages[channelMessages.length - 1].msg

		updateChannelsJson(channelName, lastMessage)
	})
}

const updateChannelsJson = (channelName, lastMessage) => {
	const channelListFilePath = path.join("datas", "channels.json")

	fs.readFile(channelListFilePath, "utf8", (err, data) => {
		if (err) {
			console.error("Erreur lors de la lecture du fichier channels.json :", err)
			return
		}

		let channelsData = []
		if (data) {
			channelsData = JSON.parse(data)
		}

		const updatedChannelsData = channelsData.map((chan) => {
			if (chan.name === channelName) {
				return {
					...chan,
					lastMsg: lastMessage !== "" ? lastMessage : null,
				}
			}
			return chan
		})

		fs.writeFile(
			channelListFilePath,
			JSON.stringify(updatedChannelsData, null, 2),
			(err) => {
				if (err) {
					console.error(
						"Erreur lors de la mise à jour du fichier channels.json :",
						err
					)
					return
				}

				console.log("Le fichier channels.json a été mis à jour avec succès.")
			}
		)
	})
}
