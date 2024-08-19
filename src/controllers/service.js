let {
    insertService,
    deleteService
} = require("../models/service");
const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");

let serviceController = {
    createServices: async (req, res) => {
        const { 
            service_code, 
            service_name,
            service_icon, 
            service_tariff 
        } = req.body;
        const id = uuidv4();
        const data = {
            id,
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

    deleteServices: async (req, res, next) => {
        try {
            const service_id = String(req.params.id);
            const { rowCount } = await findUUID(service_id);
            if (!rowCount) {
                return next(createError(403, "ID is Not Found"));
            }
            await deleteService(service_id);
            commonHelper.response(res, {}, 200, "service terhapus");
        } catch (error) {
            next(error);
        }
    },
}

module.exports = serviceController;