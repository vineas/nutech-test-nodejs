const { v4: uuidv4 } = require("uuid");
const {
  getAllTransactions,
  checkSaldo,
  topupSaldo,
  getServiceByCode,
  getMemberById,
  updateMemberBalance,
  createTransaction
} = require("../models/transaction");
const commonHelper = require("../helper/common");

let transactionController = {
  history: async (req, res) => {
    try {
      const result = await getAllTransactions();
      const transaction = result.rows;
      const filteredTransactions = transaction.map(({ transaction_id, member_id, ...rest }) => rest);
      commonHelper.response(res, filteredTransactions, 200, "Get History Berhasil");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },

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
        return res.status(400).json({ message: 'Top Up tidak valid.' });
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

  transactionService: async (req, res) => {
    const { service_code } = req.body;
    const member_id = String(req.params.id);
    try {
      const service = await getServiceByCode(service_code);
      if (!service) {
        return res.status(404).json({ message: 'Service tidak ditemukan' });
      }

      const member = await getMemberById(member_id);
      if (!member) {
        return res.status(404).json({ message: 'Member tidak ditemukan' });
      }

      const currentBalance = member.balance;
      const service_tariff = service.service_tariff;

      if (currentBalance < service_tariff) {
        return res.status(400).json({ message: 'Saldo tidak cukup' });
      }
      const newBalance = currentBalance - service_tariff;
      await updateMemberBalance(member_id, newBalance);

      const generateInvoiceNumber = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}${month}${day}`;
        const uniquePart = uuidv4().split('-')[0].slice(0, 3).toUpperCase();
        const invoiceNumber = `INV${dateString}-${uniquePart}`;
        return invoiceNumber;
      };
      const transaction_id = uuidv4();
      const invoice_number = generateInvoiceNumber();

      await createTransaction(transaction_id, invoice_number, service_code, 'PAYMENT', service_tariff, member_id);
      res.status(200).json({
        message: 'Transaction berhasil',
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gangguan server atau error' });
    }
  }
}
module.exports = transactionController;