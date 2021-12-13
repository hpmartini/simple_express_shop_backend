const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connection established'))
    .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(port, () => {
    console.log("Backend listening on port", port);
})
