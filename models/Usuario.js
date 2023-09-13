const {DataTypes }= require("sequelize")
//agora vamos importar a biblioteca do sequelize para formar uma DAtaTypes

const db = require('../db/conn')

//criar tabela no banco de dados
/**
 * CREATE TABLE user(
 * name VARCHAR(254) NOT NULL,
 * occupation(233) NOT NULL,
 * newsletter BOLL
 * );
 */
// agora as variaveís não recebem valores primitivos como texto,número,verdadeiro ou falso.
// ela tá recebendo coisa de banco de dados
const Usuario = db.define('Usuario',{
nome: {
    type: DataTypes.STRING, //tipo de dado
    require:true  // sua obrigatótiedade
},
email:{
    type: DataTypes.STRING,
    require:true
},
password:{
    type: DataTypes.STRING,
    require:true
}
})
module.exports= Usuario

/**
 *esse metódo receber os parametros: user - nome da tabela do banco de dados e em sequida os campos que tera obj com o tipo e a regra dele
 */