const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const Product = require('../models/product')



router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category);
        if(!category) return res.status(400)

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product = await product.save();

    if(!product)
    return res.status(500).send('The Product cannot be created')
})


router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({sucess: false})
    }
    res.send(productList)
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.find(ById(req.params.id));

    if(!product) {
        res.status(500).json({sucess: false})
    }
    res.send(product)
})


module.exports = router; 