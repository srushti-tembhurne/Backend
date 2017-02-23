'use strict'

const Token = require("../../../../DB_modals/token");


function logout(req, res, next) {
    var toDeleteToken = req.body.token || req.query.token || req.headers['x-access-token']
    Token.findOne({ token: toDeleteToken })
        .then((DBtoken) => {
            DBtoken.remove(function (err, success) {
                if (err) {
                    console.log("Not able to remove token")
                    res.status(200).send({ result: 'unable to logout user', success: false });
                }
                else {
                    res.status(200).send({ result: 'successfully logged out', success: true });
                }
            })

        })
        .catch((err) => {
            console.log("token not found in db")
            res.status(200).send({ result: 'unable to logout user', success: false });
        })
}

module.exports = logout;