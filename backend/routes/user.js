const express = require("express");
const router = express.Router();

const auth = require("../util/is-auth");
const userController = require("../controller/user");
const stockController = require("../controller/stocks");

router.post("/login", userController.login);

router.get("/getStock", auth, stockController.getStock);

router.post("/addStock", auth, stockController.addStock);

router.post("/updateStock", auth, stockController.updateStock);

module.exports = router;