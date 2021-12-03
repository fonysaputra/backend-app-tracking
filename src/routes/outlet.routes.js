const { authJwt } = require("../middleware");
const controller = require("../controllers/outlet.controller");
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
        `/api/${prefix}/outlet`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.post
    );

    app.get(
        `/api/${prefix}/outlet`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.get
    );

    app.patch(
        `/api/${prefix}/outlet/status`,
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.patchStatus
    );

    app.get(
        `/api/${prefix}/outlet/approve`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.getApprove
    );
};