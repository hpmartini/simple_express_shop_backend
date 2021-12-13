const {verifyUser, verifyAdminRole} = require("./verifyToken");
const CryptoJS = require("crypto-js");
const User = require('../models/User')
const router = require('express').Router();

// UPDATE
router.put('/:id', verifyUser, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new:true})
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE
router.delete('/:id', verifyUser, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET USER
router.get('/find/:id', verifyAdminRole, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...userData} = user._doc;

        res.status(200).json({...userData});
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET ALL USER
router.get('/', verifyAdminRole, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
