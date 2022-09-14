const db = require('../')

const createNewId = async () => {
    function generateNewId() {
        return Math.floor(Math.random() * 10000)
    }

    async function saveNewId(id) {
        return await new Promise((res, rej) => {
            const query = 'insert into user values (?)'
            db.query(query, [id], (err, result) => {
                if (err) rej(err)
                res(`create successful, ${result.affectedRows}`)
            })
        })
    }

    let id = 1

    while (await checkID(id))
        id = generateNewId()
    console.log(id)
    //console.log(await saveNewId(id))
    return id
}

async function checkID(id) {
    const query = 'select UID from user where UID = ?'

    return await new Promise((res) => {
        db.query(query, [id], (err, result) => {
            res(result.length !== 0)
        })
    })
}

module.exports = createNewId


