const palapaModel = require('../Models/palapaModel');

function buscarTodo(req, res) {
    palapaModel.find({})
        .then(bebidas => {
            if (bebidas.length) {
                return res.status(200).send({ bebidas })
            }
            return res.status(204).send({ mensaje: "No hay nada que mostrar" })
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `erro al solicitar la informacion ${e}` })
        })
}

function agregar(req, res) {
    // console.log(req.body)
    new palapaModel(req.body).save()
        .then(info => {
            return res.status(200).send({
                mensaje: "La infirmacion se guardo con exito",
                info
            })
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `error al guardar la informacion ${e}` })
        })
}

function buscarBebida(req, res, next) {
    if (!req.body) req.body = {}
    let consulta = {}
    consulta[req.params.key] = req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
        .then(bebidas => {
            if (!bebidas.length) return next()
            req.body.bebidas = bebidas
            return next()
        })
        .catch(e => {
            req.body.e = e
            return next()
        })
}

function mostrarBebida(req, res) {
    if (req.body.e) return res.status(404).send({ mensaje: `error al consultar la informacion` })
    if (!req.body.bebidas) return res.status(204).send({ mensaje: `No hay informacion que mostrar` })
    let beidas = req.body.bebidas
    return res.status(200).send({ beidas })
}

function eliminarBebida(req, res) {
    var bebidas = {}
    bebidas = req.body.bebidas
    palapaModel.deleteOne(bebidas[0])
        .then(info => {
            return res.status(200).send({ mensaje: `Bebida eliminada` })
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `error al eliminar la bebida`, e })
        })
}


function actualizarBebida(req, res) {
    const nombreBebida = req.params.nombre;
    palapaModel.findOneAndUpdate(
        { nombre: nombreBebida }, req.body, { new: true }              
    )
    .then(bebidaActualizada => {
        if (!bebidaActualizada) {
            return res.status(404).send({ mensaje: "Bebida no encontrada" });
        }
        return res.status(200).send({mensaje: "Bebida actualizada correctamente",bebida: bebidaActualizada})
    })
    .catch(e => {
        return res.status(500).send({mensaje: "Error al actualizar la bebida", e});
    })
}


module.exports = {
    buscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}