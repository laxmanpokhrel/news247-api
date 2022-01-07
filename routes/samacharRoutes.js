const express = require("express");
const samacharController = require("../controller/samacharController")
const router = express.Router();

router.get("/today", samacharController.getToday);
router.get("/today/latest", samacharController.getTodayLatest);
router.get("/today/latest/:number", samacharController.getTodayLatestNumber);
module.exports = router;