const Pool = require("../config/db");

const selectAllMember = () => {
  return Pool.query(`SELECT * FROM members `)
}


const createMember = (data) => {
  const { 
    id, 
    email, 
    first_name, 
    last_name, 
    passwordHash 
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO members(
      id, 
      email,
      first_name, 
      last_name, 
      password
      ) VALUES('${id}','${email}','${first_name}','${last_name}','${passwordHash}')`,
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

module.exports = {
  selectAllMember,
  createMember,
  findEmail,
};