const db = require("../models");
const config = require("../../config/auth.config");
const User = db.user;
const Role = db.role;
const UserRole = db.userRole;
const UserActive = db.userActive;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

    if (req.body.password == "" || req.body.username == "") {
        return res.status(400).send({
            code: 400,
            message: "Invalid Validation",
            data: null
        })
    } else {
        // Save User to Database
        User.create({
            username: req.body.username,
            nama_user: req.body.namaUser,
            no_hp: req.body.noHp,
            kd_user: req.body.kdUser,
            password: bcrypt.hashSync(req.body.password, 8)
        })
            .then(user => {
                dataUser = ""
                User.findOne({
                    where: {
                        username: req.body.username
                    }
                }).then(resultUser => {

                    if (!resultUser) {
                        return res.status(400).send({
                            code: 400,
                            message: "User Not Registered",
                            data: null
                        })
                    }
                    var idUser = resultUser.userId;

                    UserActive.create({
                        status: 1,
                        userId: idUser
                    })

                    // if (req.body.roles) {
                    Role.findOne({
                        where: {
                            name: "sales"
                        }
                    }).then(roles => {
                        UserRole.create({
                            roleId: roles.id,
                            userId: idUser
                        }).then(userRoles => {
                            return res.status(200).send({
                                code: 200,
                                message: "User Is Registered",
                                data: resultUser
                            })
                        })
                    });
                    // } else {
                    // UserRole.create({
                    //     roleId:roles[0].id,
                    //     userId: idUser
                    // }).then(userRoles => {
                    //     return res.status(200).send({
                    //         code: 200,
                    //         message: "User Is Registered",
                    //         data: resultUser
                    //     })
                    // })


                    //  }

                });

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

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    code: 404,
                    data: null,
                    message: "User Not found."
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    code: 401,
                    data: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.userId }, config.secret, {
                expiresIn: 166400 // 24 hours
            });

            UserRole.findOne({
                where: {
                    userId: user.userId
                }
            }).then(resultUserRole => {
                if (!resultUserRole) {
                    return res.status(404).send({
                        code: 404,
                        data: null,
                        message: "User Not found."
                    });
                }

                console.log(resultUserRole)

                var idRole = resultUserRole.roleId

                Role.findOne({
                    where: {
                        id: idRole
                    }
                }).then(roles => {
                    if (!roles) {
                        return res.status(404).send({
                            code: 404,
                            data: null,
                            message: "User Not found."
                        });
                    }

                    UserActive.findOne({
                        where: {
                            userId: user.userId
                        }
                    }).then(resultStatus => {
                        var status = 2
                        if (resultStatus) {
                            status = resultStatus.status
                        }

                        res.status(200).send({
                            code: 200,
                            data: {
                                id: user.userId,
                                username: user.username,
                                name: user.nama_user,
                                phoneNumber: user.no_hp,
                                kodeUser: user.kd_user,

                                isActiveUser: status,
                                roles: roles.name.toUpperCase(),
                                accessToken: token,
                            },
                            message: "Success Login"


                        });
                    })

                });

            })

        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                data: null, message: err.message
            });
        });
};


exports.reset = (req, res) => {

    if (!req.body.newPassword || !req.body.oldPassword) {
        return res.status(400).send({
            code: 400,
            data: null,
            message: "Invalid Validation."
        });
    }
    User.findOne({
        where: {
            userId: req.userId
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                code: 404,
                data: null,
                message: "User Not found."
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.oldPassword,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(400).send({
                code: 400,
                data: null,
                message: "Password Not Match!"
            });
        }

        User.update({
            password: bcrypt.hashSync(req.body.newPassword, 8)
        }, {
            where: {
                userId: req.userId
            }
        }).then(resultUpdate => {
            if (!resultUpdate) {
                return res.status(400).send({
                    code: 400,
                    data: null,
                    message: "Password Not Updated!"
                });
            }
            return res.status(200).send({
                code: 200,
                data: null,
                message: "Password Has Been Changed!"
            });
        })

    })
        .catch(err => {
            res.status(500).send({
                code: 500,
                data: null,
                message: err.message
            });
        });
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
    UserActive.update({
        status: statuss
    }, {
        where: {
            userId: req.userId
           
        }
    }).then(userActive => {
        if (!userActive) {
            return res.status(400).send({
                code: 400,
                message: "Status Not Updated",
                data: null
            })
        }

        return res.status(200).send({
            code: 200,
            message: "Success Update Status",
            data: {status:userActive, idUser : req.userId}
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            data: null,
            message: err.message
        });
    });
};
