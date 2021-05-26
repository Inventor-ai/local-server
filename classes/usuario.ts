// 39. Manejando usuarios conectados en el socket-server
export class Usuario {
  public id: string;     // Id usuario conectado (Obligatoria)
  public nombre: string; // Nombre usuario (Opcional)
  public sala: string;   // Sala (Opcional)

  constructor( id: string ) {
    this.id = id;
    this.nombre = 'sin-nombre';
    this.sala = 'sin-asignar';
  }
}
