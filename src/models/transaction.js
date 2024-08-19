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

  
  
  module.exports = {
    checkSaldo,
    topupSaldo,
  };