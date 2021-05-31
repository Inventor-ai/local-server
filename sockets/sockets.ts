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
  cliente.on( MENSAJE_PARA_SALA, ( payload: { de: string, cuerpo: string } )=> {  // 'mensaje'
    console.log(`  Tienes un mensaje de: ${cliente.id}`, payload );
    io.emit( MENSAJE_DeLa_SALA, payload);  // 'mensaje-nuevo'
  });
}

// Configurar usuario
export const usuarioCfg = ( cliente: Socket, io: socketIO.Server) => {
  cliente.on ( CLIENTE_CHAT_CFG , ( payload: { nombre: string}, callBack: Function ) => { 
    console.log(`Configurando a: ${cliente.id}`,  payload);
    usersOnLine.usuarioSetNombre( cliente.id, payload.nombre );
    clientesActivosGet( io );
    callBack({
       ok: true,
       msg: `Configuración para: ${payload.nombre} ok`
    });
  });
}

// Actualizar lista
const clientesActivosGet = ( io: socketIO.Server )  => {
  io.emit ( CLIENTES_ACTIVOS, usersOnLine.usuariosListaGet());
}

// Obtener lista de clientes activos
export const usuariosObtener = ( cliente: Socket, io: socketIO.Server ) => {
    console.log('usuariosObtener: ',  cliente.id);
    cliente.on ( CLIENTES_OBTENER, () => {
      io.to( cliente.id ).emit( CLIENTES_ACTIVOS, usersOnLine.usuariosListaGet() );
    });
}
