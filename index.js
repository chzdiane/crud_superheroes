/**
 * ARCHIVO PRINCIPAL DE LA API
 */
const express = require('express');
const router = require('./app/routers/index');
const app = express();

app.use(express.json());

app.use('/', router);
app.use(express.static('public'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:3001`)
  })