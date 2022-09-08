const router = require('./ItemsRouter')
const PORT = 4000

function route(app) {
    app.get('/view-cart', router)
    app.get('/', router)
    app.post('/', router)

    app.listen(PORT)
}

module.exports = route