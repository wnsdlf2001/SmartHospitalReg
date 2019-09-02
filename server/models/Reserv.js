module.exports = function(sequelize, DataTypes) {
    var Reserv = sequelize.define('Reserv', {
        rdate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '예약 날짜'
        },
        rindex: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 0,
            comment: '예약 시간(9시 -> 0, 9시반 -> 1, 10시 -> 2...'
        },
        text: {
            type: DataTypes.TEXT,
            //allowNull: false,
            comment: '추가 사항'
        },        
    }, {
        tableName: 'ttokttok_reserv',
        comment: '예약 정보'
    });
    Reserv.associate = function (models) {
        Reserv.belongsTo(models.Doctor);                
        Reserv.belongsTo(models.Family);
        Reserv.belongsTo(models.Hospital);
    };      
    return Reserv;
};