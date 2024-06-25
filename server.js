require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);




port = process.env.SERVER_PORT || 3000;

const userRoute = require('./routes/userRoute');   

app.use('/', userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

