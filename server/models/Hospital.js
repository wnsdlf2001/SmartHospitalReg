module.exports = function(sequelize, DataTypes) {
    var Hospital = sequelize.define('Hospital', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '병원 이름'
        },
    }, {
        tableName: 'ttokttok_hospital',
        comment: '병원 정보'
    });
    Hospital.associate = function (models) {
        Hospital.hasMany(models.Admin);
        Hospital.hasMany(models.Part);
        Hospital.hasMany(models.Reserv);
        Hospital.hasMany(models.Beacon);
        Hospital.hasMany(models.Descript);
    };     
    return Hospital;
};