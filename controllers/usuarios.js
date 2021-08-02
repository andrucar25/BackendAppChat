const { response } = require("express");
const Usuario = require('../models/usuario');


const getUsuarios = async ( req, res = response) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario
    .find({ _id: {$ne: req.uid}}) //Retornamos uid diferentes al nuestro
    .sort('-online') //Ordenar de forma descendente
    .skip(desde)
    .limit(10)


    res.json({
        ok: true,
        usuarios
    })
}

module.exports = {
    getUsuarios
}