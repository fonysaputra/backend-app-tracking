module.exports = (sequelize, Sequelize) => {
    const Trx = sequelize.define("tb_trxs", {
    
     id_outlet: {
        type: Sequelize.DataTypes.INTEGER,
     
      },
      idTrx: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_trx'
      },
      no_hp: {
        type: Sequelize.DataTypes.STRING,
     
      },
      ket: {
        type: Sequelize.DataTypes.STRING,
     
      },
      capture: {
        type: Sequelize.DataTypes.STRING,
     
      },
      id_user: {
        type: Sequelize.DataTypes.INTEGER,
     
      },
      tgl: {
        type: Sequelize.DataTypes.STRING,
     
      },
    });
  
    return Trx;
  };