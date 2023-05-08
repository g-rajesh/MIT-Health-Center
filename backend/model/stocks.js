const mongoose = require("mongoose");
const { Schema } = mongoose;

const stocksSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: mongoose.Types.Decimal128,
            required: true
        },
        mng: {
            type: Date,
            required: true
        },
        arrival: {
            type: Date,
            required: true
        },
        expiry: {
            type: Date,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("stocks", stocksSchema);