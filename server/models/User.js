module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        user: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '환자 아이디'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'sha256 hash 사용예정 생성시 http://www.xorbin.com/tools/sha256-hash-calculator 싸이트 참조'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '환자 이름'
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '성별'
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '환자 생년월일'
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
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '로그인 시간'
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '로그인 아이피'
        }
    }, {
        tableName: 'ttokttok_user',
        comment: '유저 정보'
    });
    User.associate = function (models) {
        User.hasMany(models.Device);
        User.hasMany(models.Family);
        User.hasMany(models.Descript);
    };        
    return User;
};