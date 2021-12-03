module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("tb_user_roles", {
    
      roleId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'userId'
      }
    });
  
    return UserRole;
  };