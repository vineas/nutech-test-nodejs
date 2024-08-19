const express = require("express");
const router = express.Router();
const memberRouter = require("../routes/member");
const transactionRouter = require("../routes/transaction");
const serviceRouter = require("../routes/service");

router.use("/member", memberRouter);
router.use("/transaction", transactionRouter);
router.use("/services", serviceRouter);

module.exports = router;