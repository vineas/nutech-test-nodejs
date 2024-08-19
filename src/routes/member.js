const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const { protect } = require("../middleware/auth");
router 
    .get("/", memberController.getAllMember)
    .post("/register", memberController.registerMember)
    .post("/login", memberController.loginMember)
    .get('/saldo/:id', protect, memberController.saldoCheck)
    .post('/topup/:id', protect, memberController.saldoTopUp)
module.exports = router;
