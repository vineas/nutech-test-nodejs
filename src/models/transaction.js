const Pool = require("../config/db");

const getAllTransactions = async () => {
  return Pool.query(`SELECT * FROM transactions`)
};

const checkSaldo = (member_id) => {
    return Pool.query(`SELECT balance FROM members WHERE member_id = '${member_id}'`)
  }
  
  const topupSaldo = (member_id, top_up_amount) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE members SET balance = balance + ${top_up_amount} WHERE member_id = '${member_id}' RETURNING balance`, (error, result) => {
          if (!error) {
            resolve(result.rows[0])
          } else {
            reject(error)
          }
        }
      );
    });
  }

  const getServiceByCode = async (service_code) => {
    console.log('Fetching service with code:', service_code);
    try {
      const result = await Pool.query('SELECT * FROM services WHERE service_code = $1', [service_code]);
      console.log('Query result:', result.rows);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  };

  const getMemberById = async (member_id) => {
    const result = await Pool.query('SELECT * FROM members WHERE member_id = $1', [member_id]);
    return result.rows[0];
  };

  const updateMemberBalance = async (member_id, newBalance) => {
    await Pool.query('UPDATE members SET balance = $1 WHERE member_id = $2', [newBalance, member_id]);
  };

  const createTransaction = async (transactionId, invoice_number, service_code, transactionType, totalAmount, member_id) => {
    await Pool.query(
      'INSERT INTO transactions (transaction_id, invoice_number, service_code, transaction_type, total_amount, member_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [transactionId, invoice_number, service_code, transactionType, totalAmount, member_id]
    );
  };
  
  
  module.exports = {
    getAllTransactions,
    checkSaldo,
    topupSaldo,
    getServiceByCode,
    getMemberById,
    updateMemberBalance,
    createTransaction
  };