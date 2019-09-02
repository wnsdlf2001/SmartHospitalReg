module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define('Doctor', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '의사 이름'
        },
        text: {
            type: DataTypes.STRING,
            //allowNull: false,
            comment: '의사 메모사항'
        },
    }, {
        tableName: 'ttokttok_doctor',
        comment: '의사 정보'
    });
    Doctor.associate = function (models) {
        Doctor.belongsTo(models.Part);
        Doctor.belongsTo(models.Hospital);
        Doctor.hasMany(models.Reserv);
        Doctor.hasMany(models.Wait);
        Doctor.hasMany(models.Descript);
    };    
    return Doctor;
};