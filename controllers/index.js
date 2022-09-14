const createNewId = require("../models/service/UserService");
const {cart, list, updateList, deleteAll} = require('../models/service/CartService')

class Controllers {
    async init(req, res) {
        res.json(await createNewId())
    }

    async getDataForCartForm(req, res) {
        const cartList = await list(req.params.id)
        console.log(cartList)
        res.json(cartList)
    }

    handleDataFromClientAndCreateCart(req, res) {
        cart(req.body)
        res.send('ok e')
    }

    async updateQuantityRequestedFromClient(req, res) {
        console.log(await updateList(req.body))
        res.send('ok chau')
    }

    deleteAll(req, res) {
        deleteAll(req.params)
        res.send('ok chit')
    }
}

module.exports = new Controllers