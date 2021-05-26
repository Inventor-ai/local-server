// 27. Detectar la desconexión de un usuario - Servidor
/* */
//  Código original del video
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';
import { MSGparaSALA, MSGdeLaSALA } from '../global/socket.events';

export const usersOnLine: UsuariosLista = new UsuariosLista();

export const usuarioConectar = ( cliente: Socket ) => {
  const user = new Usuario( cliente.id );
  usersOnLine.usuarioAdd ( user );
}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
  cliente.on('disconnect', () => {
    const user = usersOnLine.usuarioDelete( cliente.id );

    // listarUsuarios(io);
    
    console.log('Usuarios conectados:', usersOnLine.usuariosListaGet());
    console.log('Cliente desconectado:', user);
  });
}

// ??
// export const listarUsuarios = (io: socketIO.Server) => {
//     io.emit ('usuarios-conectados', usersOnLine.usuariosListaGet() );
// }

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
//   cliente.on('mensaje', ( payload, callBack )=> { // Podría ser así
  cliente.on( MSGparaSALA, ( payload: { de: string, cuerpo: string } )=> {  // 'mensaje'
//   cliente.on('mensaje', ( payload: { de: string, cuerpo: string } )=> {
    // console.log('  Tienes un mensaje:', payload );
    console.log(`  Tienes un mensaje de: ${cliente.id}`, payload );
    // 30. Escuchar emisión desde el servidor
    //     Hay que Emitir TODOS los mensajes recibidos a TODOS los usuarios conectados
    io.emit( MSGdeLaSALA, payload);  // 'mensaje-nuevo'
    // io.emit('mensaje-nuevo', payload);
  });
}

// 38. Nombre de usuario y login template
// Configurar usuario
export const usuarioCfg = ( cliente:Socket, callBack:socketIO.Server) => {
// export const usuarioCfg = ( cliente:Socket, callBack:socketIO.Server, io: socketIO.Server ) => {
  // cliente.on ('configurar-usuario', ( payload: { nombre: string} ) => { // Mostrando el usuario
  // Mostrando el payload con el nombre del usuario y agregando la entrada para el callBack
  cliente.on ('configurar-usuario', ( payload: { nombre: string}, callBack: Function ) => { 
    console.log(`Configurando a: ${cliente.id}`,  payload);
    usersOnLine.usuarioSetNombre( cliente.id, payload.nombre );
    // listarUsuarios( io );
    // callBack( payload );  // Devuelve el payload o 
    callBack({               // se puede crear un objeto con la respuesta
       ok: true,             // y porporcionar información, errores, etc.
       msg: `Configuración para: ${payload.nombre} ok`
    //    , lst: usersOnLine.usuariosListaGet()
    });
  });
}

// // Actualizar lista
// export const listaUsuarios  = ( cliente: Socket )  => {
//     cliente.emit ('usuarios-conectados', usersOnLine.usuariosListaGet() );
//     // cliente.emit ('usuarios-conectados', () => 
//     //    usersOnLine.usuariosListaGet()
//     // );
// }

/*
// También funciona sin problema
// Código con fines didácicos para asociar el tipo del cliente
import socketIO from 'socket.io';

export const desconectar = ( cliente: socketIO.Socket ) => {
  cliente.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
}

// Escuchar mensajes
export const mensaje = ( cliente: socketIO.Socket, io: socketIO.Server ) => {
    // cliente.on('mensaje', ( payload: any ) => {                          // Es válido y funciona
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {  // Es más apropiado
        console.log( '  Tengo un mensaje:' );
        console.log( payload );
        // 30. Escuchar emisión desde el servidor
        //     Hay que Emitir TODOS los mensajes recibidos a TODOS los usuarios conectados
        io.emit('mensaje-nuevo', payload);
    });
}
*/