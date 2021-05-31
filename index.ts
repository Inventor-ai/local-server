import Server from './classes/server';
import router from './routes/routes';
import cors   from 'cors';
import bodyParser from 'express';

const server = Server.instance;

server.app.use( bodyParser.urlencoded({ extended: true }) );

server.app.use( bodyParser.json() );

server.app.use( cors( { origin: true, credentials: true}) );

server.app.use( '/', router );

server.start( ()=> {
   console.log(`Servidor corriendo en el puerto: ${server.port}`);
});
