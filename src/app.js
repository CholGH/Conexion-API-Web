const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const _connect = require('./db/_connect');
require('dotenv').config();

const port = process.env.PORT;
const app = express();
_connect();

app.set('etag', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { res.send('hola mundo') });


app.listen(port, () => console.log('Servidor levantado en: localhost:' + port));