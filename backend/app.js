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

const api = process.env.API_URL

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)

    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
    res.send(newProduct)
})

app.get(`${api}/products`, async (req, res) => {

})

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