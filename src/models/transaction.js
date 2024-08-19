const Pool = require("../config/db");

const checkSaldo = (id) => {
    return Pool.query(`SELECT balance FROM members WHERE id = '${id}'`)
  }
  
  const topupSaldo = (id, top_up_amount) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        `UPDATE members SET balance = balance + ${top_up_amount} WHERE id = '${id}' RETURNING balance`, (error, result) => {
          if (!error) {
            resolve(result.rows[0])
          } else {
            reject(error)
          }
        }
      );
    });
  }
  
  module.exports = {
    checkSaldo,
    topupSaldo
  };