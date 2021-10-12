const express = require('express');
const router = express.Router();

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