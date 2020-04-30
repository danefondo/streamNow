// const { validationResult } = require('express-validator');
// let Stream = require('../models/stream');
let User = require('../models/user');
// const streamUtils = require('../utils/stream')
// const moment = require('moment');
// const mail = require('../utils/mail');  
const adminController = {
 
    async getAllUsers(req, res) {
        try {

            let users = await User.find({}).exec();
            if (!users) {
                return res.status(404).json({
                    errors: "Users not found."
                });
            }

            res.status(200).json({
                users: users,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async makeAdmin(req, res) {
        try {
            console.log("madeadmn", req.params.userId);
            let user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({
                    errors: "Users not found."
                });
            }

            user.admin = true;
            await user.save();

            res.status(200).json({
                user: user,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    },

    async withdrawAdmin(req, res) {
        try {
            console.log("made", req.params.userId);

            let user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({
                    errors: "Users not found."
                });
            }

            user.admin = false;
            await user.save();

            res.status(200).json({
                user: user,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                errors: "An unknown error occurred"
            });
        }
    }

}

module.exports = adminController;
