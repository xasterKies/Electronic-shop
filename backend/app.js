const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')


//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

require('dotenv/config');

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

app.listen(3000, () => {
    console.log(api);
    console.log('Server is running now on localhost 3000')
})