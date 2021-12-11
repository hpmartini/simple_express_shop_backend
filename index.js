const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connection established'))
    .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log("Backend listening on port", port);
})
