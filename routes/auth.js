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

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName,
        });
        if (!user && res.status(401).json('Wrong Credentials')) {
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json('Wrong Credentials')
        const {password, ...userData} = user._doc;

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
