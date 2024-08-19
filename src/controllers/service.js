let {
    insertService,
} = require("../models/service");
const commonHelper = require("../helper/common");

let serviceController = {
    createServices: async (req, res) => {
        const { 
            service_code, 
            service_name,
            service_icon, 
            service_tariff 
        } = req.body;
        const data = {
            service_code, 
            service_name,
            service_icon, 
            service_tariff
        };
        console.log(data);
        insertService(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Create Service Success")
            )
            .catch((err) => res.send(err));
    },


}

module.exports = serviceController;