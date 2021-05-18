import Server from './classes/server';
import router from './routes/routes';
import cors   from 'cors';

const server = new Server();

// 16. Obtener información del Post y argumentos por URL
// Body Parser
/*
import bodyParser from 'body-parser';
// Cfg bodyParser (Lo que sea posteado que lo tomen y lo envíen)
server.app.use( bodyParser.urlencoded({ extended: true }) );
// Pasar la petición a un formato JSON
server.app.use( bodyParser.json() );
*/
// Alternativa al BodyParser
/*
// const express = require('express'); // De (JavaScript a TypeScript)
import express from 'express';         // A
server.app.use ( express.urlencoded({ extended: true}) );
server.app.use ( express.json() );
*/
import bodyParser from 'express';
server.app.use( bodyParser.urlencoded({ extended: true }) );
// Pasar la petición a un formato JSON
server.app.use( bodyParser.json() );

// 17. Configuración del CORS
// CORS
server.app.use( cors( { origin: true, credentials: true}) );

// Rutas de servicios
server.app.use( '/', router );

server.start( ()=> {
   console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
