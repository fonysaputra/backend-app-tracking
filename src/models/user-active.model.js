module.exports = (sequelize, Sequelize) => {
    const UserActive = sequelize.define("tb_user_active", {
    
      status: {
        type: Sequelize.DataTypes.INTEGER,
     
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'userId'
      }
    });
  
    return UserActive;
  };