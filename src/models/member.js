const Pool = require("../config/db");

const selectAllMember = () => {
  return Pool.query(`SELECT * FROM members `)
}


const createMember = (data) => {
  const { id, email, first_name, last_name, passwordHash } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO members(id, email,first_name, last_name, password) VALUES('${id}','${email}','${first_name}','${last_name}','${passwordHash}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM members WHERE email='${email}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

// const checkSaldo = (id) => {
//   return Pool.query(`SELECT balance FROM members WHERE id = '${id}'`)
// }

// const topupSaldo = (id, top_up_amount) => {
//   return new Promise((resolve, reject) => {
//     Pool.query(
//       'UPDATE members SET balance = balance + $1 WHERE id = $2 RETURNING balance',
//       [top_up_amount, id],
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.rows[0]);
//         }
//       }
//     );
//   });
// }

module.exports = {
  selectAllMember,
  createMember,
  findEmail,
  // checkSaldo,
  // topupSaldo
};