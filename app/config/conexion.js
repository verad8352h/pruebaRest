const mongoose = require('mongoose')
const CONFIG = require('./configuracion')

module.exports={
    conection: null,
    connect: () =>{
        if (this.conection)return this.conection
        return mongoose.connect(CONFIG.DB)
        .then(conn =>{
            this.conection = conn
            console.log('La conexion se realizo con exito')
        })
        .catch(e => console.log('Error en la conexion', e))
    }
}