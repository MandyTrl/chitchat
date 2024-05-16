const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const app = express()

const fs = require("fs")
const path = require("path")
const channels = require("./datas/channels.json")

const channelsRoutes = require("./routes/channels.js")
const messagesRoutes = require("./routes/messages.js")

const port = 3333
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	},
})

httpServer.listen(port, () => {
	console.log(`| Listening on port | ${port} |`)
})

app.use(cors())
app.use(express.json()) //pour extraire le corps de la requête sous le format "JSON"

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	next()
})

//CHANNELS'S ROUTES ENDPOINT
app.use("/api/channels", channelsRoutes)

//MESSAGES'S ROUTES ENDPOINT
app.use("/api/messages", messagesRoutes)

io.use((socket, next) => {
	const token = socket.handshake.auth.token
	const username = socket.handshake.auth.username
	if (token && username) {
		console.log(`Authentication successful for user: ${username}`)

		return next()
	} else {
		console.log(`Authentication failed`)

		return next(new Error("Authentication failed."))
	}
})

io.on("connection", (socket) => {
	console.log(
		`😃 @${socket.handshake.auth.username} is connected | token: ${socket.handshake.auth.token}`
	)

	socket.on("disconnect", () => {
		console.log(`🥸  @${socket.handshake.auth.username} is disconnected`)
	})

	channels.map((channel) => {
		socket.on(`msgSended${channel.name}`, ({ socketId, message }) => {
			console.log(socketId, message.username, message.msg, message.date)
			const channelFilePath = path.join("datas", "messages", `${channel}.json`)

			// const msg = JSON.parse(message)

			// réécris le fichier JSON avec le contenu mis à jour
			fs.writeFile(channelFilePath, JSON.stringify(message), (err) => {
				if (err) {
					console.error("Erreur lors de l'écriture du fichier JSON :", err)
					res.status(500).json({ error: "Erreur lors de l'ajout du message." })
					return
				}

				res.json({ success: true })
			})

			// io.emit(`msgFromChannel${channel.name}`, { user, message, date })
		})
	})

	// socket.on("msgSendeddesign", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	const channelFilePath = path.join("datas", "messages", `${channel}.json`)

	// 	io.emit("msgFromChanneldesign", { user, message })
	// })

	// socket.on("msgSendedhealth", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelhealth", { user, message })
	// })

	// socket.on("msgSendedsport", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelsport", { user, message })
	// })

	// socket.on("msgSendedlifestyle", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannellifestyle", { user, message })
	// })

	// socket.on("msgSendedfood", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelfood", { user, message })
	// })

	// socket.on("msgSendedrelationship", ({ socketId, user, message }) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelrelationship", { user, message })
	// })

	// socket.on("msgSendedcinema", (socketId, user, message) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelcinema", user, message)
	// })

	// socket.on("msgSendedread", (socketId, user, message) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelread", user, message)
	// })

	// socket.on("msgSendedart", (socketId, user, message) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelart", user, message)
	// })

	// socket.on("msgSendedboardgame", (socketId, user, message) => {
	// 	console.log(socketId, user, message)
	// 	io.emit("msgFromChannelboardgame", message)
	// })
})

app.get("/", (req, res) => {
	res.status(200).send("Connected to ChitChat Backend 🪂")
})
