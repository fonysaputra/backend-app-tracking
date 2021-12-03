module.exports = (sequelize, Sequelize) => {
    const Outlet = sequelize.define("tb_outlets", {
        lat: {
            type: Sequelize.DOUBLE
        },
        lng: {
            type: Sequelize.DOUBLE
        },
        status_aktif: {
            type: Sequelize.STRING
        },
        id_users: {
            type: Sequelize.INTEGER
        },
        id_rs: {
            type: Sequelize.STRING
        },
        msisd_rs: {
            type: Sequelize.STRING
        },
        ket: {
            type: Sequelize.STRING
        },
        nama_pemilik: {
            type: Sequelize.STRING
        },
        alamat: {
            type: Sequelize.STRING
        },
        nama_outlet: {
            type: Sequelize.STRING
        },
        id_outlet: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_outlet'
        }
    });

    return Outlet;
};