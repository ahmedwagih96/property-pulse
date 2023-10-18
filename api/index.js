require('dotenv').config();
require("express-async-errors");
const connectDB = require('./db/connect')
const xss = require('xss-clean')
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

// Routes
app.use('/api/user', require("./routes/user.route.js"))
app.use('/api/auth', require('./routes/auth.route.js'))
app.use('/api/property', require('./routes/property.route.js'))

const staticPath = path.join(__dirname, '../client/dist');
app.use(express.static(staticPath));

// Error Handler Middleware
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
})

console.log(path.join(staticPath, 'index.html'))

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(8000, () =>
            console.log(`Server is listening on port 8000...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();