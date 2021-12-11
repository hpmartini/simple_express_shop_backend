const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {type: 'string', required: true, unique: true},
        description: {type: 'string', required: true},
        image: {type: 'string', required: true},
        category: {type: Array},
        size: {type: 'String'},
        color: {type: 'String'},
        price: {type: 'number', required: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);
