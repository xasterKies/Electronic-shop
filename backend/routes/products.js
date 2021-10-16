const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose');



router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category);
        if(!category) return res.status(400).send('Invalid Category')

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
    const productList = await Product.find().select('name image -_id');

    if(!productList) {
        res.status(500).json({sucess: false})
    }
    res.send(productList)
})

router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({sucess: false})
    }
    res.send({
        productCount: productCount
    })
})

router.put(`/:id`, async (req, res) => {
    if(mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
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
        },
        {new: true}
    )

    if(!product) {
        res.status(500).send('The Product cannot be updated!')
    }
    res.send(product)
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).then(product => {
        if(product) {
            return res.status(200).json({success: true, message: 'The product Found'})
        } else {
            return res.status(404).json({success: false, message: "Product not found"})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})


router.get('/get/count', )


module.exports = router; 