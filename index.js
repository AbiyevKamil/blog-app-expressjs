const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const blogRouter = require('./routes/blogs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
require("dotenv").config();

// Connect to DB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}, () => {
    console.log("DB is connected")
    app.listen(PORT, () => {
        console.log(`App is listening on ${PORT}`)
    })
    app.get('/', (req, res) => {
        res.send('Home Page')
    })
})

app.use(cors({
    origin: '*'
}));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);


