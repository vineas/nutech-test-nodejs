const Pool = require("../config/db");

const selectAllService = () => {
    return Pool.query(`SELECT * FROM services `)
  }

const insertService = (data) => {
    const { 
        service_code, 
        service_name,
        service_icon, 
        service_tariff
     } = data;
    return Pool.query(`
        INSERT INTO services(
        service_code, 
        service_name,
        service_icon, 
        service_tariff
        ) 
        VALUES ('${service_code}', '${service_name}', '${service_icon}','${service_tariff}')`
    );
}


module.exports = {
    selectAllService,
    insertService
}