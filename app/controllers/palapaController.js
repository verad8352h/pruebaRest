const palapaModel = require('../Models/palapaModel');

function buscarTodo(req,res) {
    palapaModel.find({})
    .then(bebidas =>{
        if(bebidas.length){
            return res.status(200).send({bebidas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })

    .catch(e => {return res.status(404).send({mensaje:`erro al solicitar la informacion ${e}`})})

}

function agregar(req, res) {
    // console.log(req.body)
    new palapaModel(req.body).save()
    .then(info =>{
        return res.status(200).send({
            mensaje:"La infirmacion se guardo con exito", 
            info
        })
    })
    .catch(e =>{
        return res.status(404).send({mensaje:`error al guardar la informacion ${e}`})
    })
}

module.exports={
    buscarTodo,
    agregar
}