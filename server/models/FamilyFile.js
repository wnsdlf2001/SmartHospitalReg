module.exports = function(sequelize, DataTypes) {
    var FamilyFile = sequelize.define('FamilyFile', {
        originalname: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '원래 파일명'
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '파일 타입'
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '저장 파일명'
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '파일 사이즈'
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '메모사항'
        },        
    }, {
        tableName: 'ttokttok_familyfile',
        comment: '파일 정보'
    });
    FamilyFile.associate = function (models) {
        FamilyFile.belongsTo(models.Family);
    };        
    return FamilyFile;
};