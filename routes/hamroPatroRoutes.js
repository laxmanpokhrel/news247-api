const express = require("express");
const hamroPatroController = require("../controller/hamroPatroController");
const router = express.router();

router.get("/date", hamroPatroController.getDate);