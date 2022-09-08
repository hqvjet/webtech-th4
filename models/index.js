const mysql = require('mysql')
const config = require('../config/config.json')

const db = mysql.createConnection(config.development)

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db