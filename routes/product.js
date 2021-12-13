const router = require('express').Router();
const Product = require('../models/Product')
const {verifyAdminRole} = require("./verifyToken");

router.post('/', verifyAdminRole, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // UPDATE
// router.put('/:id', verifyUser, async (req, res) => {
//     if (req.body.password) {
//         req.body.password = CryptoJS.AES.encrypt(
//             req.body.password,
//             process.env.PASSWORD_SECRET
//         ).toString();
//     }
//
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         }, {new:true})
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })
//
// // GET ALL USER
// const {verifyAdminRole, verifyUser} = require("./verifyToken");
// const User = require("../models/User");
// const CryptoJS = require("crypto-js");
// router.get('/', verifyAdminRole, async (req, res) => {
//     const query = req.query.new;
//     try {
//         const users = query
//             ? await User.find().sort({ _id: -1 }).limit(5)
//             : await User.find()
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

module.exports = router;
