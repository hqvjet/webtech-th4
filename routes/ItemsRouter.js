const express = require('express')
const router = express.Router
const controller = require('../controllers')

router.get('/', controller)
router.post('/', controller)
router.get('/view-cart', controller)

module.exports = router

