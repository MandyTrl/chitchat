const fs = require("fs") // module intégré à node qui permet de lire et d'écrire des fichiers
const path = require("path") // module intégré à node qui permet de faire des action sur les chemins des fichiers

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
exports.updateLastMsgInChannelList = async (channelName) => {
	const channelFilePath = path.join("datas", "messages", `${channelName}.json`)

	try {
		const data = await fs.readFile(channelFilePath, "utf8")
		let channelMessages = data ? JSON.parse(data) : []

		const lastMessage = channelMessages.length
			? channelMessages[channelMessages.length - 1].msg
			: ""

		if (channelMessages.length) {
			await updateChannelsJson(channelName, lastMessage)
		}
	} catch (err) {
		console.error(
			"⚠️ Erreur lors de la mise à jour des derniers messages:",
			err
		)
		throw err
	}
}

const updateChannelsJson = async (channelName, lastMessage) => {
	const channelListFilePath = path.join("datas", "channels.json")

	try {
		const data = await fs.promises.readFile(channelListFilePath, "utf8")
		let channelsData = data ? JSON.parse(data) : []

		const updatedChannelsData = channelsData.map((chan) => {
			if (chan.name === channelName) {
				return {
					...chan,
					lastMsg: lastMessage !== "" ? lastMessage : null,
				}
			}
			return chan
		})

		await fs.promises.writeFile(
			channelListFilePath,
			JSON.stringify(updatedChannelsData, null, 2)
		)
		console.log("Le fichier channels.json a été mis à jour avec succès.")
	} catch (err) {
		console.error(
			"⚠️ Erreur lors de la mise à jour du fichier channels.json:",
			err
		)
		throw err
	}
}
