const Pool = require("../config/db");

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

  const getServiceByCode = (service_code) => {
    return Pool.query('SELECT * FROM services WHERE service_code = $1', [service_code]);
  };
  
  const updateMemberBalance = (id, amount) => {
    return Pool.query('UPDATE members SET balance = balance - $1 WHERE id = $2 RETURNING balance', [amount, id]);
  };
  
  
  const createTransaction = (invoice_number, memberId, service_code, service_name, total_amount) => {
    return Pool.query(
      'INSERT INTO transactions (invoice_number, member_id, service_code, service_name, transaction_type, total_amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [invoice_number, memberId, service_code, service_name, 'PAYMENT', total_amount]
    );
  };  
  
  
  module.exports = {
    checkSaldo,
    topupSaldo,
    getServiceByCode,
    updateMemberBalance,
    createTransaction
  };