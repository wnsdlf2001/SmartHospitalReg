module.exports = function(sequelize, DataTypes) {
    var Part = sequelize.define('Part', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '과 이름'
        },
        text: {
            type: DataTypes.STRING,
            //allowNull: false,
            comment: '과 메모사항'
        },
    }, {
        tableName: 'ttokttok_part',
        comment: '과 정보'
    });
    Part.associate = function (models) {
        Part.belongsTo(models.Hospital);
        Part.hasMany(models.Doctor);
    };     
    return Part;
};