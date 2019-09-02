module.exports = function(sequelize, DataTypes) {
    var Wait = sequelize.define('Wait', {
        rdatetime: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '예약 날짜'
        },
        text: {
            type: DataTypes.TEXT,
            comment: '추가 사항'
        },        
    }, {
        tableName: 'ttokttok_wait',
        comment: '대기 정보'
    });
    Wait.associate = function (models) {
        Wait.belongsTo(models.Doctor);                
        Wait.belongsTo(models.Family);
    };      
    return Wait;
};