// 39. Manejando usuarios conectados en el socket-server
// Centralizar TODA la lógica para los usuarios
// Procesos para agregar, para mandar un mensaje
// al grupo o a un usuario en particular

import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un usuario
    public usuarioAdd( usuario: Usuario ) {         // Own Name
    // public usuarioAgregar ( usuario: Usuario ) { // Video Name
      this.lista.push( usuario );
      console.log('usuarioAgregar' );
      console.log('Lista: ', this.lista );
      return usuario;
    }

    // 
    public usuarioSetNombre( id: string, nombre: string ) {            // Own Name
    // public usuarioActualizarNombre ( id: string, nombre: string ) { // Video Name
      // En lugar de esto aquí se inserta la consuilta y actualización en la DB
      for (const usuario of this.lista) {
        if ( usuario.id === id ) {
             usuario.nombre = nombre;
             break;
        }
      }
      console.log('===> Actualizando usuario...');
      console.log('Lista: ', this.lista );
    }

    // Obtener lista de usuarios
    public usuariosListaGet() { // Own Name
    // public getLista() {      // Video Name
      return this.lista;
    }

    // Regresar un usuario
    public usuarioGet(id: string) {     // Own Name
    // public getUsuario (id: string) { // Video Name
      //  Versión corta
      return this.lista.find ( usuario => usuario.id === id );
      //  Versión larga
    //   return this.lista.find ( usuario => {
    //     return usuario.id === id
    //   });
    // Own Proposal -Try to test it
    //   for (const usuario of this.lista) {
    //        if ( usuario.id === id ) {
    //             return usuario;
    //        }
    //   }
    }

    // Obtener usuarios en un sala en particular
    public usuarioGetFromSala( sala: string ) {     // Own Name
    // public getUsuariosEnSala ( sala: string ) {  // Video Name
      //  Versión corta
      return this.lista.filter( usuario => usuario.sala === sala );
      //  Versión larga
      // return this.lista.filter ( usuario => {
      //     return usuario.sala === sala;
      //   });
    }

    // Borrar un usuario => Decuelve el usuario borrado
    // (Cuando un usuario deja el chat ya no hay que mantenerlo en la lista)
    public usuarioDelete(id: string) {      // Own Name
    // public borrarUsuario (id: string) {  // Video Name
      const tmpUser = this.usuarioGet( id );
      this.lista = this.lista.filter( usuario => usuario.id !== id );
      // Versión larga
      //   this.lista = this.lista.filter( usuario => {
      //        return usuario.id !== id 
      //   });
      return tmpUser;
    }
    
}
