const express = require("express")
const router = express.Router()
const channelsControllers = require("../controllers/channels.js")

router.post("/", channelsControllers.addChannel)

router.get("/", channelsControllers.getChannels)

module.exports = router
