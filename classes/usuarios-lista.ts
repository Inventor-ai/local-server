import { Usuario } from './usuario';

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    // Agregar un usuario
    public usuarioAdd( usuario: Usuario ) {
      this.lista.push( usuario );
      console.log('usuarioAgregar' );
      console.log('Lista: ', this.lista );
      return usuario;
    }

    public usuarioSetNombre( id: string, nombre: string ) {
      for (const usuario of this.lista) {
        if ( usuario.id === id ) {
             usuario.nombre = nombre;
             break;
        }
      }
      console.log('===> Actualizando usuario: ', nombre);
      console.log('Lista: ', this.lista );
    }

    // Obtener lista de usuarios
    public usuariosListaGet() {
      return this.lista.filter ( usuario =>
         usuario.nombre !== 'sin-nombre'
      );
    }

    // Regresar un usuario
    public usuarioGet(id: string) {
      return this.lista.find( usuario => usuario.id === id );
    }

    // Obtener usuarios en un sala en particular
    public usuarioGetFromSala( sala: string ) {
      return this.lista.filter( usuario => usuario.sala === sala );
    }

    // Borrar un usuario => Devuelve el usuario borrado
    // (Cuando un usuario se desconecta ya no hay que mantenerlo en la lista)
    public usuarioDelete(id: string) {
      const tmpUser = this.usuarioGet( id );
      this.lista = this.lista.filter( usuario => usuario.id !== id );
      return tmpUser;
    }
    
}
