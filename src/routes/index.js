const express = require("express");
const router = express.Router();
const memberRouter = require("../routes/member");
// const transactionRouter = require("../routes/pengalaman");

router.use("/member", memberRouter);
// router.use("/transaksi", transactionRouter);

module.exports = router;