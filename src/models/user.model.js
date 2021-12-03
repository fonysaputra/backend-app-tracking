module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_users", {
      username: {
        type: Sequelize.STRING
      },
      nama_user: {
        type: Sequelize.STRING
      },
      no_hp: {
        type: Sequelize.STRING
      },
      kd_user: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_users'
      }
    });
  
    return User;
  };