const User = require('../models/User')

class Controllers {
    init(req, res) {
        res.send('')
    }

    getData(req, res) {
        console.log(req.body)
        const user = new User(req.body)
        user.createBill()

    }
}

module.exports = Controllers