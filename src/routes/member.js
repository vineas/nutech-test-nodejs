const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const { protect } = require("../middleware/auth");
router 
    .get("/", protect, memberController.getAllMember)
    .post("/register", memberController.registerMember)
    .post("/login", memberController.loginMember)
module.exports = router;
