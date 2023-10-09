require('dotenv').config();
require("express-async-errors");
const connectDB = require('./db/connect')
const express = require('express')
const app = express()

app.use(express.json())
// Routes
const userRoutes = require("./routes/user.route");
const authRoutes = require('./routes/auth.route')

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


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