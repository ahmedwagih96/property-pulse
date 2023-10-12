require('dotenv').config();
require("express-async-errors");
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const { errorHandler } = require('./middleware/error');
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser());

// Routes
app.use('/api/user', require("./routes/user.route.js"))
app.use('/api/auth', require('./routes/auth.route.js'))
app.use('/api/property', require('./routes/property.route.js'))

// Error Handler Middleware
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();