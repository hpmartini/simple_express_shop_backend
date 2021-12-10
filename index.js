const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('Connection established'))
    .catch((error)=>console.log(error));

app.listen(port, () => {
    console.log("Backend listening on port", port);
})
