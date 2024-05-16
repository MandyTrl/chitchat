const express = require("express")
const router = express.Router()
const messagesControllers = require("../controllers/messages.js")

router.get("/:channel", messagesControllers.getMessagesFromChannel)

module.exports = router
