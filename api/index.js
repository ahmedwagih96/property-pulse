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
const path = require('path')
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
app.set('trust proxy', true);
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
}))
// Routes
app.use('/api/user', require("./routes/user.route.js"))
app.use('/api/auth', require('./routes/auth.route.js'))
app.use('/api/property', require('./routes/property.route.js'))

const staticPath = path.join(__dirname, "..", '/client/dist');
app.use(express.static(path.join(staticPath, '/client/dist')));

// Error Handler Middleware
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'client', 'dist', 'index.html'));
})

// Running The Server
const PORT = 8000

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