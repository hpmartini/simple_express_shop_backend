const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
    {
        userId: {type: 'string', required: true},
        productId: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    },
    {timestamps: true}
)

module.exports = mongoose.model("Cart", CartSchema);
