const express = require("express");
const samacharController = require("../controller/samacharController")
const router = express.router();

router.get("/today", samacharController.getToday);
router.get("/today/latest", samacharController.getTodayLatest);
router.get("/today/latest/:number", samacharController.getTodayLatestNumber);