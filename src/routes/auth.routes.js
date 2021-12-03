const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const prefix = "v1"
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    `/api/${prefix}/auth/signup`,
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.patch(
    `/api/${prefix}/auth/reset`,
    [authJwt.verifyToken, authJwt.isSalesOrAdmin],
    controller.reset
  );

  app.patch(
    `/api/${prefix}/auth/status`,
    [authJwt.verifyToken, authJwt.isSales],
    controller.patchStatus
  );


  app.post(`/api/${prefix}/auth/signin`, controller.signin);
};