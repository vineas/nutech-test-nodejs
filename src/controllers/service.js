let {
    selectAllService,
    insertService
} = require("../models/service");
const commonHelper = require("../helper/common");

let serviceController = {

    getAllService: async (req, res) => {
        try {
            const result = await selectAllService();
            const services = result.rows;
            commonHelper.response(res, services, 200, "Data berhasil diambil");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    },
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