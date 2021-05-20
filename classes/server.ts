import express from 'express';
import { SERVER_PORT } from '../global/environment';
// 22. Continuación del proyecto - Socket.io
import http from 'http';
import socketIO, { Socket } from 'socket.io';
// 27. Detectar la desconexión de un usuario - Servidor
// importar sólo la constante: desconectar (Es la que contiene la función)
// import { desconectar } from '../sockets/sockets';  // Own solution test 1/2
// Importa todas las exportaciones disponibles en: '../sockets/sockets'
// pueden bajo el nombre socket (<-identificador / Alias) seguidas de .[nombre]
// socket.[constante/funcion exportadas]
import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  // 22. Continuación del proyecto - Socket.io
  private httpServer: http.Server;
  public io: socketIO.Server;

  private constructor() {
     this.app =  express();
     this.port = SERVER_PORT;

     // 22. Continuación del proyecto - Socket.io
     this.httpServer = new http.Server( this.app );
    // Configuración de lo sockets.
     /*
     this.io = socketIO( this.httpServer ); // Video original. Corre pero marca este error:
     ---------------
     import socketIO
     This expression is not callable.
       Type 'typeof import("c:/data/Cursos/Udemy/Angular/05-AppsTiempoReal/sockets/01-server/node_modules/socket.io/dist/index")' 
       has no call signatures.ts(2349)
     ---------------
     Solución:
    */
    // En respuesta a la pregunta: 
    //    no puedo asociar HTTP server con io
    this.io = new socketIO.Server ( this.httpServer, { cors: { origin: true, credentials: true } });
    // Prueba personal sin CORS
    // this.io = new socketIO.Server ( this.httpServer ); // Esto produce el error:
    // Access to XMLHttpRequest at 'http://localhost:5000/socket.io/?EIO=4&transport=polling&t=Nc2CNcV' 
    // from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' 
    // header is present on the requested resource.

    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || ( this._instance = new this() );
  }

  private escucharSockets() {
    console.log('Atención: Escuchando conexiones - sockets (server)');
    this.io.on('connection', cliente => {
      console.log('Cliente conectado');

      // Este es el lugar donde vamos a crear TODOS los eventos
      // Vamos a emitir y a escuchar eventos. Dado que puede contener muchas
      // líneas de código, se integrará desde ../sockets/socets.ts
      
      // 27. Detectar la desconexión de un usuario - Servidor
      //     Función para escuchar la desconexión. Integrada en este mismo archivo
      // cliente.on('disconnect', () => {
      //   console.log('Cliente desconectado');
      // });
      //     Función para escuchar la desconexión. Importada desde otro archivo
      // Own solution test 2/2
      // desconectar( cliente );

      // Desconectar cliente
      socket.desconectar( cliente );

      // Recibir mensaje
      socket.mensaje ( cliente, this.io );
    });
  }

  start ( callback: Function ) {
    //  this.app.listen ( this.port, callback() );  // Levanta al servidor express
     this.httpServer.listen ( this.port, callback() );
  }

}