const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors());
app.options('*', cors())


const api = process.env.API_URL
require('dotenv/config');


//Routes
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const usersRoutes = require('./routes/users')
const odersRoutes = require('./routes/orders');
const { application } = require('express');


//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));


app.use(`${api}/products`, productsRoutes)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

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