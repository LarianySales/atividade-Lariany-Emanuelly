const { DataTypes } = require("sequelize")
const db = require('../db/conn')

const livro = db.define('livro', {
    autor: {
       
            type: DataTypes.STRING,
            require: true
        
    },titulo: {
        type: DataTypes.STRING,
        require: true
    },
    capa: {
        type: DataTypes.BOOLEAN

    },
    preco:{
        type:DataTypes.STRING,
        require:true
    }

})
module.exports = livro