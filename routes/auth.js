const router = require('express').Router();
const User = require('../models/User')

router.post('/register', async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        eMail: req.body.eMail,
        password: req.body.password,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
