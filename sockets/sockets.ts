// 27. Detectar la desconexión de un usuario - Servidor
/* 
//  Código original del video
import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => {
  cliente.on('disconnect', () => {
      console.log('Cliente desconectado');
  });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
//   cliente.on('mensaje', ( payload, callBack )=> { // Podría ser así
  cliente.on('mensaje', ( payload: { de: string, cuerpo: string } )=> {
    console.log('  Tienes un mensaje:', payload );
    // 30. Escuchar emisión desde el servidor
    //     Hay que Emitir TODOS los mensajes recibidos a TODOS los usuarios conectados
    io.emit('mensaje-nuevo', payload);
  })
}
*/
/**/
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
