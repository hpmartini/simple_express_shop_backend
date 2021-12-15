const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: {type: 'string', required: true, unique: true},
        description: {type: 'string', required: true},
        image: {type: 'string', required: true},
        categories: {type: Array},
        size: {type: Array},
        color: {type: Array},
        price: {type: 'number', required: true},
        inStock: {type: 'boolean', default: true},
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema);
