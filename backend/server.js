const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
dotenv.config();
const userRoute = require('./routes/userRoute');
const errorHandler = require("./middleware/errorMiddleWare");



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

// ✅ FIXED: Changed 'unsubscribe' to 'use'
app.use(
    cors({
        origin: ['http://localhost:3000'], // Remove "Your domain url" or replace with actual domain
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;
app.use("/api/users", userRoute)

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Home Page");
});

// Connect to db
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});