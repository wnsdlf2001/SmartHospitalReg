module.exports = function(sequelize, DataTypes) {
    var Beacon = sequelize.define('Beacon', {
        uuid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '비콘 아이디'
        },
        text: {
            type: DataTypes.STRING,
            //allowNull: false,
            comment: '비콘 메모사항'
        },
    }, {
        tableName: 'ttokttok_beacon',
        comment: '비콘 정보',
    });
    Beacon.associate = function (models) {
        Beacon.belongsTo(models.Hospital);
    };       
    return Beacon;
};