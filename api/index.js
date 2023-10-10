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
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route')

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

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