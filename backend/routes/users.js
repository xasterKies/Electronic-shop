const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country

    })
    user = await category.save();

    if(!user)
    return res.status(404).send('The user cannot be created!')

    res.send(category)
})

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('name phone email');

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList)
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwodHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    res.status(200).send(user)
})

module.exports = router;