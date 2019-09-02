module.exports = function(sequelize, DataTypes) {
    var Family = sequelize.define('Family', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '환자 이름'
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '환자 생년월일'
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '성별'
        },        
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '환자 주소'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '환자 연락처'
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '황자 메모사항 ex) 나, 엄마, 동생'
        },
    }, {
        tableName: 'ttokttok_family',
        comment: '가족정보 정보'
    });
    Family.associate = function (models) {
        Family.belongsTo(models.User);
        Family.hasOne(models.FamilyFile);
        Family.hasMany(models.Reserv);        
        Family.hasMany(models.Wait);   
        Family.hasMany(models.Descript);   
    };        
    return Family;
};