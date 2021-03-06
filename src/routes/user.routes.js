const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const prefix = "v1"
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/test/callback", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    `/api/${prefix}/users/sales`,
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserSales
);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};