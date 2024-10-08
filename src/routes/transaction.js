const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");
const { protect } = require("../middleware/auth");
router 
    .get('/saldo/:id', protect, transactionController.saldoCheck)
    .post('/topup/:id', protect, transactionController.saldoTopUp)
    .post('/:id', protect, transactionController.transactionService)
    .get('/history', protect, transactionController.history)

module.exports = router;
