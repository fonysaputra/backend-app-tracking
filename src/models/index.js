const config = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);

db.userRole = require("./users-role.model")(sequelize, Sequelize);
db.userActive = require("./user-active.model")(sequelize, Sequelize);
db.websites = require("./websites.model")(sequelize, Sequelize);
db.outlet = require("./outlet.model")(sequelize, Sequelize);
db.trx = require("./trx.model")(sequelize, Sequelize);
db.tracking = require("./tracking.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "tb_user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "tb_user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["sales", "admin"];

module.exports = db;