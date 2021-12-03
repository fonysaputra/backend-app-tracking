const { authJwt } = require("../middleware");
const controller = require("../controllers/trx.controller");
const prefix = "v1"
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        `/api/${prefix}/transaction`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.post
    );

    app.get(
        `/api/${prefix}/transaction`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.get
    );

    app.post(
        `/api/${prefix}/transaction/tracking`,
        [authJwt.verifyToken, authJwt.isSales],
        controller.postTracking
    );

    app.get(
        `/api/${prefix}/transaction/users/:idUser/tracking`,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.getLastTracking
    );

   
};