const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const _connect = require('./db/_connect');

const userRoutes = require('./routes/userRouter');

require('dotenv').config();

const port = process.env.PORT;

_connect();

const app = express();

app.set('etag', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/account', userRoutes)

app.listen(port, () => console.log('Servidor levantado en: localhost:' + port))