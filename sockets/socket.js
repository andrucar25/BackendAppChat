const {io} = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    
    console.log('Cliente conectado');
    
    //Obtener el JWT
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] )

    // Varificar autenticacion
    if ( !valido ) { return client.disconnect(); }

    //Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una determinada sala
    // Sala global, cliente.id
    client.join( uid );

    // Escuchar el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        // TODO: Grabar mensaje
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload);
    })

    // Cliente desconectado
    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
        
    });

    /*client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload);

        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });*/
  });