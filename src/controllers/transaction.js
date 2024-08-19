const Pool = require("../config/db");
const { 
    checkSaldo, 
    topupSaldo
} = require("../models/transaction");
const commonHelper = require("../helper/common");

let transactionController = {
    saldoCheck: async (req, res) => {
        const id = String(req.params.id);
        checkSaldo(id)
            .then((result) =>
                commonHelper.response(res, result.rows, 200, "Cek saldo sukses")
            )
            .catch((err) => res.send(err));
    },

    saldoTopUp: async (req, res) => {
        try {
            const { top_up_amount } = req.body;
            const id = req.params.id;
            if (isNaN(top_up_amount) || top_up_amount <= 0) {
                return res.status(400).json({ message: 'top_up_amount tidak valid.' });
            }
            const member = await topupSaldo(id, top_up_amount);
            return res.status(200).json({
                message: 'Top up balance berhasil',
                balance: member.balance,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

}
module.exports = transactionController;