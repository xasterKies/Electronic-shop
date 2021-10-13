const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')


const api = process.env.API_URL
require('dotenv/config');


const productsRouter = require('./routers/product')


//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));


//Routes
app.use(`${api}/products`, productsRouter)


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then( ()=> {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log('Database did not connect...')
})


//Server
app.listen(3000, () => {
    console.log(api);
    console.log('Server is running now on localhost 3000')
})