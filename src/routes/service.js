const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service");
const { protect } = require("../middleware/auth");
router 
    .post("/", serviceController.createServices)
    .delete("/", serviceController.deleteServices)

module.exports = router;
