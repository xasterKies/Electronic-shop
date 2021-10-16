const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');
const authJwt = require('./helpers/jwt')


app.use(cors());
app.options('*', cors())


//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));
app.use(authJwt);


//Routes
const productsRoutes = require('./routes/products')
const categoriesRoutes = require('./routes/categories')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders');


const api = process.env.API_URL

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