module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define("tb_websites", {
    
    
      officeName: {
        type: Sequelize.DataTypes.STRING,
        field: 'office_name'
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        field: 'address'
      },
      lat: {
        type: Sequelize.DataTypes.DOUBLE,
        field: 'lat'
      },
      lang: {
        type: Sequelize.DataTypes.DOUBLE,
        field: 'lang'
      }
    });
  
    return UserRole;
  };