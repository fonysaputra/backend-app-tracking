const db = require("../models");
const config = require("../../config/auth.config");
const User = db.user;
const Outlet = db.outlet;
const { Op } = require("sequelize");

exports.get = (req, res) => {
    search=""
    if (req.query.search) {
        search = req.query.search
    }

    Outlet.findAll({
        where: { 
          
              
            nama_outlet: {
                  [Op.like]: "%"+search+"%"
                },
         
                          
           },   order: [['updatedAt', 'DESC']]
    }).then(outlet => {
        if (!outlet) {
            return res.status(400).send({
                code: 400,
                message: "Outlet Not Found",
                data: null
            })
        }
        data = { page: 1, limit: 10, totalAll: outlet.length, total: 10, data: outlet }
        return res.status(200).send({
            code: 200,
            message: "Success Get Outlet",
            data: data
        })
    })
};

exports.getApprove = (req, res) => {
    Outlet.findAll({
        where: {
            status_aktif: 1
        }
    }).then(outlet => {
        if (!outlet) {
            return res.status(400).send({
                code: 400,
                message: "Outlet Not Found",
                data: null
            })
        }
        data = { page: 1, limit: 10, totalAll: outlet.length, total: 10, data: outlet }
        return res.status(200).send({
            code: 200,
            message: "Success Get Outlet",
            data: data
        })
    })
};

exports.post = (req, res) => {
    console.log(req.body.namaOutlet)
    if (!req.body.namaOutlet || !req.body.namaPemilik) {
        return res.status(400).send({
            code: 400,
            message: "Invalid Validation",
            data: null
        })
    } else {
        // Save outlet to Database
        Outlet.create({
            nama_outlet: req.body.namaOutlet,
            alamat: req.body.alamat,
            nama_pemilik: req.body.namaPemilik,
            ket: req.body.ket,
            lat: req.body.lat,
            lng: req.body.lng,
            status_aktif: 0,
            id_users: req.userId,
            id_rs: req.body.idRs,
            msisd_rs: req.body.msisdRs
        })
            .then(outlet => {
                if (!outlet) {
                    return res.status(400).send({
                        code: 400,
                        message: "Outlet Not Registered",
                        data: null
                    })
                }
                return res.status(200).send({
                    code: 200,
                    message: "Success Registered Outlet",
                    data: outlet
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


exports.patchStatus = (req, res) => {
    if (!req.body.status){
        return res.status(400).send({
            code: 400,
            data: null,
            message: "Status Is Required!"
        });
    }
    var statuss = req.body.status
    Outlet.update({
        status_aktif: statuss
    }, {
        where: {
            id_outlet: req.body.idOutlet
           
        }
    }).then(outlet => {
        if (!outlet) {
            return res.status(400).send({
                code: 400,
                message: "Status Not Updated",
                data: null
            })
        }

        return res.status(200).send({
            code: 200,
            message: "Success Update Status",
            data: {status:outlet.status_aktif, idUser : req.userId}
        })
  
    }).catch(err => {
        res.status(500).send({
            code: 500,
            data: null,
            message: err.message
        });
    });
};