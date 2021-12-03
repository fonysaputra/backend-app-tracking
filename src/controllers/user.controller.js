const db = require("../models");
const config = require("../../config/auth.config");
const { tracking } = require("../models");
const User = db.user;
const Website = db.websites;

const Tracking = db.tracking;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

async function getDest(userId) {
  var tracking = await db.sequelize.query('SELECT * from tb_trackings limit 1', {
    //replacements: {id: req.user.id},
    type: db.sequelize.QueryTypes.SELECT
  });
  var data = tracking
  return data
}

exports.getUserSales = async (req, res) => {

  search = ""

  if (req.query.name) {
    search = req.query.name
  }

  var users = await db.sequelize.query(`SELECT tb_users.*, tb_user_actives.status from tb_users inner join tb_user_actives on tb_users.id_users=tb_user_actives.userId INNER JOIN tb_user_roles ON tb_user_roles.userId=tb_users.id_users INNER JOIN tb_roles ON tb_roles.id=tb_user_roles.roleId  WHERE tb_roles.name = "sales" AND nama_user LIKE "%${search}%" `, {
    //   replacements: {name: req.query.name},
    type: db.sequelize.QueryTypes.SELECT
  });

  data = {page:1,limit:10,totalAll:users.length,total:10,data:users}

  return res.status(200).send({
    code: 200,
    message: "Success Get Users",
    data: data
  })
};


