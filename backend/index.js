const express = require("express")
const cors = require("cors")
const app = express()
const port = 3333

app.listen(port, () => {
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

app.get("/", (req, res) => {
	res.status(200).send("Connected to ChitChat Backend 🪂")
})
