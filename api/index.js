require('dotenv').config();
require("express-async-errors");
const connectDB = require('./db/connect')
const xss = require('xss-clean')
const rateLimiting = require('express-rate-limit');
const helmet = require('helmet')
const hpp = require('hpp');
const { errorHandler } = require('./middleware/error');
const cookieParser = require('cookie-parser')
const express = require('express');

const app = express();

app.use(express.json())
app.use(cookieParser());

// Security Headers (helmet)
app.use(helmet());

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());

// Protect Http Param Pollution
app.use(hpp());

// Rate Limiting 
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
}))
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