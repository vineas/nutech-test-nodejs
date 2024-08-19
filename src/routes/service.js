const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service");
const { protect } = require("../middleware/auth");
router 
    .post("/", serviceController.createServices)

module.exports = router;
