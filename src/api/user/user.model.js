

export default function(sequelize, Sequelize){
    var User= sequelize.define('usuario', {
    usuario: Sequelize.STRING,
    password: Sequelize.STRING
},{timestamps: false});
return User;
};