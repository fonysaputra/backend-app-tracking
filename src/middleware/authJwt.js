const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const UserRole = db.userRole;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  let xtraAuth = req.headers["xtra-auth"];
  if (!token || !xtraAuth) {
    return res.status(403).send({
      code: 403,
      data: null,
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err && xtraAuth != process.env.EXTRA_AUTH) {
      return res.status(401).send({
        code: 401,
        data: null,
        message: "Unauthorized!"
      });
    }else if(!decoded){
      return res.status(401).send({
        code: 401,
        data: null,
        message: "Unauthorized!"
      });
    }
    console.log("Cdcd")
    console.log(decoded.id)
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findOne({ userId: req.userId }).then(user => {
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

      var idRole = resultUserRole.roleId

      Role.findOne({
        where: {
          id: idRole
        }
      }).then(roles => {
        console.log(roles);
        if (roles.name === "admin") {
          next();
          return;
        }

        res.status(403).send({
          code: 403,
          data: null,
          message: "Require Admin Role!"
        });
        return;

      })

    })

  });
};

isSales = (req, res, next) => {
  console.log(req.userId)
  User.findOne({where: { userId: req.userId }}).then(users => {
    UserRole.findOne({
      where: {
        userId:req.userId
      }
    }).then(resultUserRole => {
      if (!resultUserRole) {
        return res.status(404).send({
          code: 404,
          data: null,
          message: "User Not found."
        });
      }

      var idRole = resultUserRole.roleId

      Role.findOne({
        where: {
          id: idRole
        }
      }).then(roles => {
        console.log("userId")
        console.log(users.userId)
        console.log(roles);
        if (roles.name === "sales") {
          next();
          return;
        }

        res.status(403).send({
          code: 403,
          data: null,
          message: "Require Sales Role!"
        });
        return;

      })

    })

  });
};

isSalesOrAdmin = (req, res, next) => {
  User.findOne({ userId: req.userId }).then(user => {
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

      var idRole = resultUserRole.roleId

      Role.findOne({
        where: {
          id: idRole
        }
      }).then(roles => {
        console.log(roles);
        if (roles.name === "admin") {
          next();
          return;
        }

        if (roles.name === "sales") {
          next();
          return;
        }

        res.status(403).send({
          code: 403,
          data: null,
          message: "Require Admin or Sales Role!"
        });
        return;

      })

    })

  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isSales: isSales,
  isSalesOrAdmin: isSalesOrAdmin
};
module.exports = authJwt;