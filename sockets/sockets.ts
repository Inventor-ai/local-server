//  Código original del video
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';
import { CLIENTE_CHAT_CFG, MENSAJE_PARA_SALA, MENSAJE_DeLa_SALA, 
         CLIENTES_ACTIVOS, CLIENTES_OBTENER } from './socket.events';

export const usersOnLine: UsuariosLista = new UsuariosLista();

export const usuarioConectar = ( cliente: Socket ) => {
  const user = new Usuario( cliente.id );
  usersOnLine.usuarioAdd ( user );
}

// 27. Detectar la desconexión de un usuario - Servidor
export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
  cliente.on('disconnect', () => {
    const user = usersOnLine.usuarioDelete( cliente.id );
    clientesActivosGet( io );
    console.log('Usuarios conectados:', usersOnLine.usuariosListaGet());
    console.log('Cliente desconectado:', user);
  });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {  
//   cliente.on('mensaje', ( payload, callBack )=> { // Podría ser así
  cliente.on( MENSAJE_PARA_SALA, ( payload: { de: string, cuerpo: string } )=> {  // 'mensaje'
//cliente.on(  'mensaje',  ( payload: { de: string, cuerpo: string } )=> {
    console.log(`  Tienes un mensaje de: ${cliente.id}`, payload );
    // 30. Escuchar emisión desde el servidor
    //     Hay que Emitir TODOS los mensajes recibidos a TODOS los usuarios conectados
    io.emit( MENSAJE_DeLa_SALA, payload);  // 'mensaje-nuevo'
 // io.emit('mensaje-nuevo', payload);
  });
}

// 38. Nombre de usuario y login template
// Configurar usuario
export const usuarioCfg = ( cliente: Socket, io: socketIO.Server) => {
  // cliente.on ('configurar-usuario', ( payload: { nombre: string} ) => { // Mostrando el usuario
  // Mostrando el payload con el nombre del usuario y agregando la entrada para el callBack
  // cliente.on ('configurar-usuario', ( payload: { nombre: string}, callBack: Function ) => { 
  cliente.on ( CLIENTE_CHAT_CFG , ( payload: { nombre: string}, callBack: Function ) => { 
    console.log(`Configurando a: ${cliente.id}`,  payload);
    usersOnLine.usuarioSetNombre( cliente.id, payload.nombre );
    clientesActivosGet( io );
    // callBack( payload );  // Devuelve el payload o 
    callBack({               // se puede crear un objeto con la respuesta
       ok: true,             // y porporcionar información, errores, etc.
       msg: `Configuración para: ${payload.nombre} ok`
    //    , lst: usersOnLine.usuariosListaGet()  // Lista de usuarios - Sólo al que configura nuevo
    });
  });
}

// 53. Componente de Lista de Usuarios
// Actualizar lista
const clientesActivosGet = ( io: socketIO.Server )  => {
  io.emit ( CLIENTES_ACTIVOS, usersOnLine.usuariosListaGet());
}

// 54. Tarea - Obtener lista de usuarios - socket
// Obtener lista de clientes activos
export const usuariosObtener = ( cliente: Socket, io: socketIO.Server ) => {
    console.log('usuariosObtener: ',  cliente.id);
    cliente.on ( CLIENTES_OBTENER, () => {
      io.to( cliente.id ).emit( CLIENTES_ACTIVOS, usersOnLine.usuariosListaGet() );
    });
}

/*
// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {  
  //   cliente.on('mensaje', ( payload, callBack )=> { // Podría ser así
    cliente.on( MSGparaSALA, ( payload: { de: string, cuerpo: string } )=> {  // 'mensaje'
  //cliente.on(  'mensaje',  ( payload: { de: string, cuerpo: string } )=> {
      console.log(`  Tienes un mensaje de: ${cliente.id}`, payload );
      // 30. Escuchar emisión desde el servidor
      //     Hay que Emitir TODOS los mensajes recibidos a TODOS los usuarios conectados
      io.emit( MSGdeLaSALA, payload);  // 'mensaje-nuevo'
      // io.emit('mensaje-nuevo', payload);
    });
  }
*/  

/*
// También funciona sin problema
// Código con fines didácicos para asociar el tipo del cliente
import socketIO from 'socket.io';
// 27. Detectar la desconexión de un usuario - Servidor
export const desconectarX = ( cliente: socketIO.Socket ) => {
  cliente.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
}
*/

/*
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
