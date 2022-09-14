const express = require('express')
const cartRouter = express.Router()
const controller = require('../controllers')

cartRouter.get('/:id', controller.getDataForCartForm)
cartRouter.post('/update/:id', controller.updateQuantityRequestedFromClient)
cartRouter.post('/delete/:id', controller.deleteAll)
module.exports = cartRouter