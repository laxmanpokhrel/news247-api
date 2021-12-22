const express = require("express");
const ekantipurController = require("../controller/ekantipurController")
const router = express.router();

router.get("/today", ekantipurController.getToday);
router.get("/today/latest", ekantipurController.getTodayLatest);
router.get("/today/latest/:number", ekantipurController.getTodayLatestNumber);