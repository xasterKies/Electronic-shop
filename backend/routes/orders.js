const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const userOrderList = await Order.find().populate('user', 'name').sort({'dateOrdered' : -1 });

    if(!userOrderList) {
        res.status(500).json({success: false})
    }
    res.send(userOrderList)
})

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        
        path: 'orderItems', populate: {
            path: 'product', populate: 'order'}
        })

    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order)
})

router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map( async orderitem => {
        let newOrderItem = new OrderItem({
            quantity: orderitem.quantity,
            product: orderitem.product
        })

        newOderItem = await newOderItem.save();

        return newOderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds

    const totalPrice = await Promise
    .all(orderItemsIdsResolved.map(async (orderItem) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalprice
    }))

    const totalPrice = totalPrice.reduce((a, b) => a + b, 0)

    console.log(totalPrices)

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user
    })
    order = await order.save();

    if(!order)
    return res.status(404).send('The oreder cannot be created!')

    res.send(order)
})


router.put('/:id' ,async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.param.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if(!order)
    return res.status(400).send('The order cannot be created!')

    res.send(order)
})

router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(order => {
        if(order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
        } else {
            return res.status(404).json({success: false, message: 'order not found'})
        }
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})

router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: {_id: null, totalsales : { $sum : '$totalPrice'}}}
    ])

    if(!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send(({totalSales: totalSales.pop().totalsales}))
})

router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count)

    if(!orderCount) {
        res.status(500).json({sucess: false})
    }
    res.send({
        orderCount: orderCount
    })
})

router.get(`/get/userorders/:userid`, async (req, res) => {
    const userOrderList = await Order.find({user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'
        }
    }).sort({'dateOrdered' : -1 });

    if(!userOrderList) {
        res.status(500).json({success: false})
    }
    res.send(userOrderList)
})

module.exports = router;