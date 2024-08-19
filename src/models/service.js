const Pool = require("../config/db");

const insertService = (data) => {
    const { 
        id,
        service_code, 
        service_name,
        service_icon, 
        service_tariff
     } = data;
    return Pool.query(`
        INSERT INTO services(
        id,
        service_code, 
        service_name,
        service_icon, 
        service_tariff
        ) 
        VALUES ('${id}','${service_code}', '${service_name}', '${service_icon}','${service_tariff}')`
    );
}

const deleteService = (id) => {
    return Pool.query(`DELETE FROM services WHERE id='${id}'`);
  }

module.exports = {
    insertService,
    deleteService
}