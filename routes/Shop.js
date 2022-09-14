const express = require('express')
const shopRouter = express.Router()
const controller = require('../controllers')

shopRouter.get('/', controller.init)
shopRouter.post('/', controller.handleDataFromClientAndCreateCart)

module.exports = shopRouter