import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import socketIO from 'socket.io';
import * as socket from '../sockets/sockets';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;

  private httpServer: http.Server;
  public io: socketIO.Server;

  private constructor() {
    this.app =  express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server( this.app );
    this.io = new socketIO.Server ( this.httpServer, { cors: { origin: true, credentials: true } });
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || ( this._instance = new this() );
  }

  public get usersOnLineLst() {
    return socket.usersOnLine.usuariosListaGet();
  }

  private escucharSockets() {
    console.log('Atención: Escuchando conexiones - sockets (server)');
    this.io.on('connection', cliente => {
      console.log('Cliente conectado:', cliente.id );

      socket.usuarioConectar( cliente );

      socket.usuarioCfg ( cliente, this.io );

      socket.usuariosObtener( cliente, this.io );

      socket.desconectar( cliente, this.io );

      socket.mensaje ( cliente, this.io );
    });
  }

  start ( callback: Function ) {
    this.httpServer.listen ( this.port, callback() );
  }

}