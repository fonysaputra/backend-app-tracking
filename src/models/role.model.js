module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("tb_roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role;
  };