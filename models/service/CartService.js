const db = require('../')

const cart = data => {
    console.log(data)
    const search = 'select quantity from cart where UID = ? and lapName = ?'
    const insert = 'insert into cart value (?, ?, ?)'
    const itemHandler = new Promise((res, rej) => {
        db.query(search, [data.id, data.name], (err, result) => {
            if (err) throw err
            if (result.length === 0)
                res()
            else
                rej(result[0].quantity)
        })
    })

    itemHandler.then(
        function () {
            db.query(insert, [data.id, data.name, data.quantity], (err, result) => {
                if (err) throw err
                console.log(`cart ok, ${result.affectedRows}`)
            })
        },
        function (quantity) {
            const update = 'update cart set quantity = ? where UID = ? and lapName = ?'
            const totalQuantity = Number(quantity) + Number(data.quantity)
            db.query(update, [totalQuantity.toString(), data.id, data.name], (err, result) => {
                if (err) throw err
                console.log(`ok ${result.affectedRows}`)
            })
        }
    )
}

const list = async (id) => {
    return await new Promise((res, rej) => {
        const query = 'SELECT cart.lapName, quantity, products.lapCost from cart inner join products on cart.lapName = products.lapName where cart.UID = ?'
        db.query(query, [id], (err, result) => {
            if (err) rej(err)
            res(result)
        })
    })
}

const updateList = async (data) => {
    if (data.quantity !== '0') {
        console.log('1')
        return await new Promise((res, rej) => {
            const query = 'update cart set quantity = ? where UID = ? and lapName = ?'
            db.query(query, [data.quantity, data.uid, data.lapName], (err, result) => {
                if (err) throw rej(err)
                res(result.affectedRows)
            })
        })
    } else {
        console.log('200')
        return await new Promise((res, rej) => {
            const query = 'delete from cart where UID = ? and lapName = ?'
            db.query(query, [data.uid, data.lapName], (err, result) => {
                if (err) rej(err)
                res('ok')
            })
        })
    }

}

const deleteAll = (id) => {
    const query = 'delete from cart where uid = ?'
    db.query(query, [id.id], (err, result) => {
        if(err) throw err
    })
}

module.exports = {cart, list, updateList, deleteAll}