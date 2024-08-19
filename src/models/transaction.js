const Pool = require("../config/db");

const checkSaldo = (id) => {
    return Pool.query(`SELECT balance FROM members WHERE id = '${id}'`)
  }
  
  const topupSaldo = (id, top_up_amount) => {
    return new Promise((resolve, reject) => {
      Pool.query(
        'UPDATE members SET balance = balance + $1 WHERE id = $2 RETURNING balance',
        [top_up_amount, id],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows[0]);
          }
        }
      );
    });
  }
  
  module.exports = {
    checkSaldo,
    topupSaldo
  };