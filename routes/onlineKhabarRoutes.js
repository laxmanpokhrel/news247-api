const express = require("express");
const onlineKhabarController = require("../controller/onlineKhabarController");
const router = express.router();

router.get("/today", onlineKhabarController.getToday);
router.get("/today/latest".onlineKhabarController.getTodayLatest);
router.get("/today/latest/:number", onlineKhabarController.getTodayLatestNumber)