const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { selectAllMember, findEmail, createMember } = require("../models/member");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

let memberController = {

    getAllMember: async (req, res) => {
        try {
            const result = await selectAllMember();
            const members = result.rows.map(member => {
                delete member.password;
                return member;
            });

            commonHelper.response(res, members, 200, "Data berhasil diambil");
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    },

    registerMember: async (req, res) => {
        try {
            const { email, first_name, last_name, password } = req.body;
            const schema = Joi.object({
                email: Joi.string().email().required().messages({
                    "string.email": "Parameter email tidak sesuai format",
                    "any.required": "Email wajib diisi"
                }),
                first_name: Joi.string().required(),
                last_name: Joi.string().required(),
                password: Joi.string().min(8).max(15).required().messages({
                    "string.min": "Password harus memiliki minimal 8 karakter",
                    "string.max": "Password tidak boleh lebih dari 15 karakter",
                    "any.required": "Password wajib diisi"
                }),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const { rowCount } = await findEmail(email);
            if (rowCount) {
                return res.status(409).json({ message: "Email sudah digunakan" });
            }
            const passwordHash = bcrypt.hashSync(password, 10);
            const id = uuidv4();
            const data = {
                id,
                email,
                first_name,
                last_name,
                passwordHash
            };
            const result = await createMember(data);
            commonHelper.response(res, result.rows, 201, "Registrasi berhasil silahkan login");

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    },

    loginMember: async (req, res) => {
        try {
            const { email, password } = req.body;
            const schema = Joi.object({
                email: Joi.string().email().required().messages({
                    "string.email": "Parameter email tidak sesuai format",
                    "any.required": "Email wajib diisi"
                }),
                password: Joi.string().min(8).max(15).required().messages({
                    "string.min": "Password harus memiliki minimal 8 karakter",
                    "string.max": "Password tidak boleh lebih dari 15 karakter",
                    "any.required": "Password wajib diisi"
                })
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const { rows: [member] } = await findEmail(email);
            if (!member) {
                return res.status(401).json({ message: "Email salah" });
            }
            const isValidPassword = bcrypt.compareSync(password, member.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Password salah" });
            }
            delete member.id;
            delete member.password;
            const payload = { email: member.email };
            member.token = authHelper.generateToken(payload);
            // member.refreshToken = authHelper.refreshToken(payload);
            return commonHelper.response(res, member, 200, "Login sukses");
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Terjadi kesalahan pada server" });
        }
    },


    profile: async (req, res) => {
        const email = req.payload.email;
        const {
            rows: [member],
        } = await findEmail(email);
        delete member.password;
        commonHelper.response(res, member, 200);
    },

    RefreshToken: (req, res) => {
        const refreshToken = req.body.RefreshToken
        const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
        const payload = {
            email: decoded.email,
        }
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.refreshToken(payload)
        }
        commonHelper.response(res, result, 200, "Token is Already generate");


    }
};

module.exports = memberController;