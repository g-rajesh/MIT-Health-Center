const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const userRoutes = require("./routes/user");

// const Stocks = require("./model/stocks");

const app = express();

const options = {
     origin: '*',
}

// http connection
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res, next) => {
    return res.status(200).json({ "message": "Hello fro server" });
})

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    const data = error.data;
    return res.status(status).json({ message, data });
});

mongoose.connect("mongodb+srv://nolanoftenet3601:NolanOfTenet3601@cluster0.tmh1hms.mongodb.net/Health-Center?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB database");
    app.listen(8081, async () => {
        console.log(`Server starts listening at PORT 8081`);
    });
});
