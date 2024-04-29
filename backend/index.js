const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const app = express()
const port = 3333
const httpServer = createServer(app)
const socketIo = new Server(httpServer, {
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

let connectedUsers = {}
const clearConnectedUsers = () => {
	connectedUsers = {}
}

socketIo.on("connection", (socket) => {
	console.log(`😃 ) u s e r connected | ${socket.id} |`)
	connectedUsers[socket.id] = socket

	socket.on("disconnect", () => {
		console.log(`🥸  ) u s e r disconnected | ${socket.id} |`)
		delete connectedUsers[socket.id]
	})

	socket.on("msgSendedtechnologies", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChanneltechnologies", message)
	})

	socket.on("msgSendeddesign", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChanneldesign", message)
	})

	socket.on("msgSendedhealth", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelhealth", message)
	})

	socket.on("msgSendedsport", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelsport", message)
	})

	socket.on("msgSendedlifestyle", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannellifestyle", message)
	})

	socket.on("msgSendedfood", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelsportfood", message)
	})

	socket.on("msgSendedrelationship", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelrelationship", message)
	})
	socket.on("msgSendedcinema", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelcinema", message)
	})

	socket.on("msgSendedread", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelread", message)
	})

	socket.on("msgSendedart", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelart", message)
	})

	socket.on("msgSendedboardgame", (socketId, message) => {
		console.log(socketId, message)
		socketIo.emit("msgFromChannelboardgame", message)
	})
})

process.on("SIGINT", () => {
	clearConnectedUsers()
	process.exit()
})

process.on("SIGTERM", () => {
	clearConnectedUsers()
	process.exit()
})

app.get("/", (req, res) => {
	res.status(200).send("Connected to ChitChat Backend 🪂")
})
