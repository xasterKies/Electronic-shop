const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');




//Middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));


require('dotenv/config');

const api = process.env.API_URL

app.post(`${api}`/products, (req, res) => {
    const newProduct = req.body 
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'img-url'
    }

    res.send('Hello API !')
})

app.listen(3000, () => {
    console.log(api);
    console.log('Server is running now on localhost 3000')
})