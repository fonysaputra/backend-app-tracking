module.exports = (sequelize, Sequelize) => {
    const Tracking = sequelize.define("tb_trackings", {
        id_tracking: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_tracking'
          },

        trx_id: {
            type: Sequelize.DataTypes.INTEGER
        },
        id_user: {
            type: Sequelize.DataTypes.INTEGER,

        },
        lat: {
            type: Sequelize.DataTypes.DOUBLE,

        },
        lng: {
            type: Sequelize.DataTypes.DOUBLE,

        },
        time: {
            type: Sequelize.DataTypes.STRING,

        },
    });

    return Tracking;
};