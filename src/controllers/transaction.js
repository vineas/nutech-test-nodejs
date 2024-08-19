const Pool = require("../config/db");
const { 
    checkSaldo, 
    topupSaldo, 
    getServiceByCode, 
    updateMemberBalance, 
    createTransaction 
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

    makeTransaction: async (req, res) => {
        const id = req.params.id;
        const { service_code } = req.body;
      
        try {
          // Dapatkan service berdasarkan kode
          const serviceResult = await getServiceByCode(service_code);
      
          if (serviceResult.rows.length === 0) {
            return res.status(404).json({ status: 1, message: 'Service not found' });
          }
      
          const service = serviceResult.rows[0];
          const serviceTariff = service.service_tariff;
      
          // Dapatkan saldo member
          const memberBalanceResult = await Pool.query('SELECT balance FROM members WHERE id = $1', [id]);
      
          if (memberBalanceResult.rows.length === 0) {
            return res.status(404).json({ status: 1, message: 'Member not found' });
          }
      
          const currentBalance = memberBalanceResult.rows[0].balance;
      
          // Cek apakah saldo cukup
          if (currentBalance < serviceTariff) {
            return res.status(400).json({ status: 1, message: 'Insufficient balance' });
          }
      
          // Update saldo
          const memberResult = await updateMemberBalance(id, serviceTariff);
      
          // Generate invoice number
          const invoice_number = `INV${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${uuidv4().slice(0, 6)}`;
      
          // Buat transaksi
          const transactionResult = await createTransaction(
            invoice_number,
            id,
            service_code,
            service.service_name,
            serviceTariff
          );
      
          const transaction = transactionResult.rows[0];
      
          // Respon berhasil
          return res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: {
              invoice_number: transaction.invoice_number,
              service_code: transaction.service_code,
              service_name: transaction.service_name,
              transaction_type: transaction.transaction_type,
              total_amount: transaction.total_amount,
              created_on: transaction.created_on,
              remaining_balance: memberResult.rows[0].balance // Tambahkan sisa saldo member setelah transaksi
            }
          });
      
        } catch (err) {
          return res.status(500).json({ status: 1, message: err.message });
        }
    }

}
module.exports = transactionController;