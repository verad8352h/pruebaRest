const mongoose = require('mongoose')

const palapaSchema  = mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    capacidad:{
        type:Number,
        required:true
    },
    existencias:{
        type:Number,
        default:10
    }
})

const palapaModel = mongoose.model('bebidas', palapaSchema)

module.exports=palapaModel