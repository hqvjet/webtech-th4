const shopRouter = require('./Shop')
const cartRouter = require("./Cart");
const PORT = 4000

function routes(app) {

    app.use('/shop', shopRouter)
    app.use('/view-cart', cartRouter)

    app.listen(PORT)
}

module.exports = routes