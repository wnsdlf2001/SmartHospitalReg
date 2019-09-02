module.exports = function(sequelize, DataTypes) {
    var Descript = sequelize.define('Descript', {
        ddate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '처방일'
        },        
        text: {
            type: DataTypes.STRING,
            //allowNull: false,
            comment: '처방 메모사항'
        },
    }, {
        tableName: 'ttokttok_descript',
        comment: '처방 정보',
    });
    Descript.associate = function (models) {
        Descript.belongsTo(models.Hospital);
        Descript.belongsTo(models.Doctor);
        Descript.belongsTo(models.User);
        Descript.belongsTo(models.Family);
        Descript.hasOne(models.DescriptFile);
    };     
    return Descript;
};