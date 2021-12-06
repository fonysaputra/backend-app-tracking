const { authJwt } = require("../middleware");
const controller = require("../controllers/uploadImage");
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
        `/api/${prefix}/uploads/images`,
        [authJwt.verifyToken, authJwt.isSalesOrAdmin],
        controller.uploadsImages
    )

    app.get(
        `/api/${prefix}/uploads/:name`,
       
        controller.getImages
    )

   
};