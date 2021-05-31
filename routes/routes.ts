import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { MENSAJE_PRIVADO, MENSAJE_DeLa_SALA } from '../sockets/socket.events';
import { usersOnLine } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response) => {
   res.json({
       ok: true,
       msg: 'Servicio GET running ok'
   });
});

router.put('/mensajes', (req: Request, res: Response) => {
  res.json({
      ok: true,
      msg: 'Servicio PUT running ok'
  });
});

router.put('/mensajes/:id', (req: Request, res: Response) => {
  const valores = req.params;
  res.json({
      ok: true,
      msg: 'Servicio PUT running ok',
      valores
  });
});

router.delete('/mensajes', (req: Request, res: Response) => {
  res.json({  
      ok: true,
      msg: 'Servicio DELETE running ok'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {    
  const cuerpo = req.body.cuerpo;  
  const de     = req.body.de;

  const payload = { de, cuerpo };
  Server.instance.io.emit( MENSAJE_DeLa_SALA, payload );

  res.json ({
      ok: true,
      msg: 'Mensaje para todos via POST',
      cuerpo,
      de
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const params = req.params;
  const id     = req.params.id;
  const de     = req.body.de;
  const cuerpo = req.body.cuerpo;
  const payload = { de, cuerpo };
  const server = Server.instance;
  server.io.in( id ).emit( MENSAJE_PRIVADO, payload );   // Consola
  server.io.in( id ).emit( MENSAJE_DeLa_SALA, payload ); // Chat

  res.json ({
      ok: true,
      msg: 'Mensaje privado para ID en la URL vía POST',
      cuerpo,
      de,
      id,
      params
  })
});

router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.allSockets()
        .then( ( clientes ) => 
           res.json({
              ok: true,
              msg: '',
              clientes: Array.from(clientes)
           })
        )
        .catch( ( err )=> {
           res.json ({
             ok: false,
             msg: '¡No hay conexiones disponibles!',
             err
           })
        });
});

router.get('/usuarios/detalle', ( req: Request, res: Response) => {
  console.log( 'Lista de usuarios enviada' );
  res.json({
    ok: true,
    msg: 'GET: Lista de ID´s y sus nombres de usuario',
    clientes: usersOnLine.usuariosListaGet()
  })
});

router.get('/usuariosx', ( req: Request, res: Response) => {
  const { de, cuerpo } = req.body;
  const server = Server.instance;
  const payload = server.usersOnLineLst;
  res.json({
      ok: true,
      msg: 'Lista de usuarios en línea',
      body: req.body,
      de, cuerpo, 
      usuarios: payload
  });
});

router.get('/usuarios/detalles', ( req: Request, res: Response) => {
  console.log(usersOnLine.usuariosListaGet());
  res.json({
    ok: true,
    msg: 'GET for users details',
    listado: usersOnLine['lista']
  })
});

export default router;
