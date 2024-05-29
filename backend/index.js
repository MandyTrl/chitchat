const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const app = express()

const { updateMessages } = require("./controllers/messages.js")
const { updateLastMsgInChannelList } = require("./controllers/channels.js")

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
		console.log(
			`🥸  @${socket.handshake.auth.username} is disconnected | token: ${socket.handshake.auth.token}`
		)
	})

	//augmente la limite de listeners
	socket.setMaxListeners(channels.length + 5)

	channels.map((channel) => {
		socket.on(`msgSended${channel.name}`, async ({ message }) => {
			await updateMessages(channel.name, message)
			await updateLastMsgInChannelList(channel.name)

			// io.emit(`msgFromChannel${channel}`, { user, message, date })
		})
	})

	socket.on("typing", (data) => {
		socket.broadcast.emit("typingResponse", data)
	})
})

app.get("/", (req, res) => {
	res.status(200).send("Connected to ChitChat Backend 🪂")
})
