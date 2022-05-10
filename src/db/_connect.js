const mongoose = require('mongoose');
require('dotenv').config();

const connection = process.env.MONGO_CRED + '@' + process.env.MONGO_CLUSTER + '/' + process.env.MONGO_DB
const URI = 'mongodb+srv://' + connection + '?retryWrites=true&w=majority';

function _connect() {
    mongoose.connect(URI, function (err) {
        if (err) { throw console.log('Se ha producido un error: ' + err); }
        else { console.log('Conexion establecida con ' + process.env.MONGO_DB) }
    })
}
module.exports = _connect
