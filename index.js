//require dotenv configured so that index.js knows how to pull variables from the .env file
require('dotenv').config();

//import express to build the server, massive to connect the server to the database, and the variables from the .env file
const express = require('express'),
    massive = require('massive'),
    ctrl = require('./products_controller.js'),
    {SERVER_PORT, CONNECTION_STRING} = process.env,
    port = SERVER_PORT

const app = express()

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
}).catch(err => console.log(err))

app.get('/api/products', ctrl.getAll)

app.get('/api/products/:id', ctrl.getOne)

app.put('/api/products/:id', ctrl.update)

app.post('/api/products', ctrl.create)

app.delete('/api/products/:id', ctrl.delete)

app.listen(port, console.log(`Server listening on port: ${port}`))