const Stocks = require("../model/stocks");

exports.getStock = async (req, res, next) => {
    try {
        const stocks = await Stocks.find();
        return res.status(200).json({
            message: "Fetched successfully...",
            data: stocks
        });

    } catch(err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
}

exports.addStock = async (req, res, next) => {

    try {
        if(req.username === "pharmacist") {
            const noAccessError = new Error("Username doesn't exist");
            noAccessError.data =  { message: "You don't have access to perform this action!" };
            noAccessError.status = 500;
            throw noAccessError;
        }

        const stock = await Stocks.create( req.body );
        await stock.save();

        return res.status(200).json({
            message: "Inserted successfully...",
            data: stock
        });

    } catch(err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
}

exports.updateStock = async (req, res, next) => {

    const { _id, qty } = req.body;
    try {
        if(req.username === "admin") {
            const noAccessError = new Error("Username doesn't exist");
            noAccessError.data =  { message: "You don't have access to perform this action!" };
            noAccessError.status = 500;
            throw noAccessError;
        }

        if(qty !== 0) {
            await Stocks.updateOne({ _id }, { qty });
        } else {
            await Stocks.deleteOne({ _id });
        }

        const stocks = await Stocks.find();
        return res.status(200).json({
            message: "Updated successfully...",
            data: stocks
        });

    } catch(err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
}

