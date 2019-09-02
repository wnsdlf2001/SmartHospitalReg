module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define('Admin', {
        user: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '관리자 아이디'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'sha256 hash 사용예정 생성시 http://www.xorbin.com/tools/sha256-hash-calculator 싸이트 참조'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '관리자 이름'
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '로그인 시간'
        },
        ip: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validate: {
                isIPv4: true
            },
            comment: '로그인 아이피'
        }
    }, {
        tableName: 'ttokttok_admin',
        comment: '관리자 정보',
    });
    Admin.associate = function (models) {
        Admin.belongsTo(models.Hospital);
    };    
    return Admin;
};