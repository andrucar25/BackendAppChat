/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } =require('../middlewares/validar_campos');
const { validarJWT } = require('../middlewares/validar_jwt');
const router = Router();

router.post('/new',[
    check('nombre','Se requiere un nombre').not().isEmpty(),
    check('password','Se requiere una contraseña').not().isEmpty(),
    check('email','Se requiere un email').isEmail(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('password','Se requiere una contraseña').not().isEmpty(),
    check('email','Se requiere un email').isEmail(),
], login);


router.get('/renew', validarJWT, renewToken);

module.exports = router;