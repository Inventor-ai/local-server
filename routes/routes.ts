import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { MSGprivado, MSGdeLaSALA } from '../sockets/socket.events';

const router = Router();

// Servicio GET
router.get('/mensajes', ( req: Request, res: Response) => {
   res.json({
       ok: true,
       msg: 'Servicio GET running ok'
   });
});

// Servicio POST que recibe datos
router.post('/mensajes', (req: Request, res: Response) => {    
  const cuerpo = req.body.cuerpo;  
  const de     = req.body.de;

  const payload = { de, cuerpo };
  // Instancia sea ÚNICA por patrón SINGLETON
  // const server = Server.instance;
  // server.io.emit( MSGdeLaSALA, payload );
  // La línea siguiente reeamplaza a las dos previas
  Server.instance.io.emit( MSGdeLaSALA, payload );

  res.json ({
      ok: true,
      msg: 'Servicio POST running ok',
      cuerpo,
      de
  });
});

// Servicio POST que recibe datos y un parámetro en la URL
router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de     = req.body.de;
  const id     = req.params.id;
  const params = req.params;

  const payload = {
    de, cuerpo
  };

  // El patrón SINGLETON asegura que la instancia sea ÚNICA
  const server = Server.instance;
  server.io.in( id ).emit( MSGprivado, payload );

  res.json ({
      ok: true,
      msg: 'Servicio POST with URL params running ok',
      // cuerpo: cuerpo, // Puede expresarse así pero
      cuerpo,            // es = y + más simple así.
      de,
      id,
      params
  })
});

router.put('/mensajes', (req: Request, res: Response) => {
  res.json({
      ok: true,
      msg: 'Servicio PUT running ok'
  });
});

// Servicio PUT con el objetos de los parámetros en la URL
router.put('/mensajes/:id', (req: Request, res: Response) => {
  const valores = req.params;
  res.json({
      ok: true,
      msg: 'Servicio PUT running ok',
      valores
  });
});

// Servicio DELETE
router.delete('/mensajes', (req: Request, res: Response) => {
  res.json({  
      ok: true,
      msg: 'Servicio DETELE running ok'
  });
});

export default router;
