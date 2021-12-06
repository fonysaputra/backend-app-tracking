const db = require("../models");
const config = require("../../config/auth.config");
const Websites = db.websites;
const Trx = db.trx;
const Tracking = db.tracking;

const upload = require("../middleware/uploads");
var moment = require('moment');
const { tracking } = require("../models");

exports.get = (req, res) => {
    Trx.findAll().then(trx => {
        if (!trx) {
            return res.status(400).send({
                code: 400,
                message: "Transaksi Not Found",
                data: null
            })
        }
        data = { page: 1, limit: 10, data: trx }
        return res.status(200).send({
            code: 200,
            message: "Success Get Transaksi",
            data: data
        })
    })
};




exports.postTracking = (req, res) => {
    const today = moment().format();
    var time = (today.replace(/T/, ' ').replace(/\..+/, '').replace("+07:00", ""))

    Tracking.findAll({
        where: {
            id_user: req.userId
        }, limit: 1, order: [['time', 'DESC']]
    }).then(findTracking => {
        console.log(findTracking)
        if (findTracking.length != 0) {
            Tracking.update({
                lat: req.body.lat,
                lng: req.body.lng,
                time: time
            }, {
                where: {
                    id_user: req.userId,
                }
            }).then(track => {
                if (!track) {
                    return res.status(400).send({
                        code: 400,
                        message: "Tracking Not Updated",
                        data: null
                    })
                }

                return res.status(200).send({
                    code: 200,
                    message: "Success Update Tracking",
                    data: track
                })
            })

        } else {
            Tracking.create({
                id_user: req.userId,
                lat: req.body.lat,
                lng: req.body.lng,
                time: time
            }).then(tracking => {
                if (!tracking) {
                    return res.status(400).send({
                        code: 400,
                        message: "Transaction Not Saved !!",
                        data: null
                    })
                }
                return res.status(200).send({
                    code: 200,
                    message: "Success Save Transaction",
                    data: tracking
                })
            })
        }
    });


}
exports.post = (req, res) => {
    if (!req.body.idOutlet) {
        return res.status(400).send({
            code: 400,
            message: "Invalid Validation",
            data: null
        })
    } else {
        // Save trx to Database

        const timeElapsed = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', hour12: false });
        const today = moment().format();
        console.log(moment().format())
        Trx.create({
            id_outlet: req.body.idOutlet,
            no_hp: req.body.noHp,
            ket: req.body.ket,
            capture: req.body.capture,
            id_user: req.userId,
            tgl: today.replace(/T/, ' ').replace(/\..+/, '').replace("+07:00", "")
        })
            .then(trx => {
                if (!trx) {
                    return res.status(400).send({
                        code: 400,
                        message: "Transaction Not Saved !!",
                        data: null
                    })
                }
                console.log(trx.null)
                Tracking.create({
                    trx_id: trx.null,
                    id_user: req.userId,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    time: today.replace(/T/, ' ').replace(/\..+/, '').replace("+07:00", "")
                }).then(tracking => {
                    if (!tracking) {
                        return res.status(400).send({
                            code: 400,
                            message: "Transaction Not Saved !!",
                            data: null
                        })
                    }
                    trx.idTrx = trx.null
                    return res.status(200).send({
                        code: 200,
                        message: "Success Save Transaction",
                        data: trx
                    })
                })
            })
            .catch(err => {
                res.status(500).send({
                    code: 500,
                    data: null,
                    message: err.message
                });
            });
    }
};


exports.getLastTracking = async (req, res) => {
    var idUser = ""
    if (req.params.idUser) {
        idUser = req.params.idUser
    }
    Tracking.findAll({
        where: {
            id_user: idUser
        }, limit: 1, order: [['time', 'DESC']]
    }).then(data => {
        console.log(data.length)
        if (!data) {
            return res.status(200).send({
                code: 200,
                data: data,
                message: "Success Get Users Tracking"
            });
        }
        if (data.length == 0) {
            return res.status(400).send({
                code: 400,
                data: null,
                message: "Success Get Users Tracking"
            });
        }
        Websites.findOne().then(sources => {
            console.log(sources)

            var dataTracking = {
                destination: { lat: data[0].lat, lng: data[0].lng },
                source: { lat: sources.lat, lng: sources.lang }
            }
            return res.status(200).send({
                code: 200,
                data: dataTracking,
                message: "Success Get User Tracking"
            });
        })

        // res.status(200).send({
        //     code: 200,
        //     data: data,
        //     message: "Success Get User Tracking"
        // });

    })


}