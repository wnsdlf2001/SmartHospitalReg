module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        uuid: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '안드로이드 기기 아이디'
        },
        fcmid: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'FCM 토큰값'
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '업데이트 아이피'
        }
    }, {
        tableName: 'ttokttok_device',
        comment: '디바이스 정보'
    });
    Device.associate = function (models) {
        Device.belongsTo(models.User);
    };         
    return Device;
};