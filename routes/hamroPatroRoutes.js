const express = require("express");
const hamroPatroController = require("../controller/hamroPatroController");
const router = express.Router();

router.get("/date", hamroPatroController.getDate);
module.exports = router;