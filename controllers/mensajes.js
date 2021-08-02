
const { response } = require('express');
const Mensaje = require('../models/mensaje');


const obtenerChat = async(req, res) => {

    const miId = req.uid;
    const mensajeDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{ de: miId, para: mensajeDe }, { de: mensajeDe, para: miId }] // Concatenar ambos id
    })
    .sort({createdAt: 'desc'}) // Ordenar los mensajes creados de forma descendente
    .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    })
}


module.exports = {
    obtenerChat
}