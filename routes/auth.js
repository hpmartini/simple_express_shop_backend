const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')

// register
router.post('/register', async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        eMail: req.body.eMail,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
