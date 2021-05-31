import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { MENSAJE_PRIVADO, MENSAJE_DeLa_SALA } from '../sockets/socket.events';
import { usersOnLine } from '../sockets/sockets';

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
  // server.io.emit( MENSAJE_DeLa_SALA, payload );
  // La línea siguiente reeamplaza a las dos previas
  Server.instance.io.emit( MENSAJE_DeLa_SALA, payload );

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
  // El mensaje es desplegado en el componente que lo escuche
  server.io.in( id ).emit( MENSAJE_PRIVADO, payload );   // En la consola (modal dedicado, etc.)
  server.io.in( id ).emit( MENSAJE_DeLa_SALA, payload ); // En la ventana de chat

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

// Servicios para obtener la sesión (ID's) de los Sockets
// 51. REST - Obtener los IDs de los usuarios activos
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;  // Instancia del servidor de IO en el servidor
  server.io.allSockets()
        .then( ( clientes ) => 
           res.json({
              ok: true,
              msg: '',
              clientes: Array.from(clientes)
              // clientes // Devuelve un objeto vacío
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

/*
// all sockets in default namespace
const ids = await io.allSockets();
 
// all sockets in the "chat" namespace
const ids = await io.of("/chat").allSockets();
 
// all sockets in the "chat" namespace and in the "general" room
const ids = await io.of("/chat").in("general").allSockets();
*/

/*
// Para obtener la sesión (ID's) de los Sockets// Servicio para obtener todos los IDs de los usuarios
router.get('/usuariosIDs', (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients( ( err: any, clientes: string[] ) => {
      if ( err ) {
          return res.json({
              ok: false,
              err
          })
      }

      res.json({
          ok: true,
          clientes
      });
  });
});
*/

// Own Solution for lesson 51 and 52
// 51. REST - Obtener los IDs de los usuarios activos
// 52. REST - Obtener los nombres y los IDs de las personas conectadas
router.get('/usuariosx', ( req: Request, res: Response) => {
  // const user = {
  //   id: 42,
  //   is_verified: true
  // };
  // const {id, is_verified} = user;
  // const pl = req.body;
  const { de, cuerpo } = req.body; // Desestructuración del body

  const server = Server.instance;
  const payload = server.usersOnLineLst;

  res.json({
      ok: true,
      msg: 'GET for users details',
      body: req.body,
      de, cuerpo, 
      usuarios: payload
  });
});

// 52. REST - Obtener los nombres y los IDs de las personas conectadas
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response) => {
  const usrsList = usersOnLine.usuariosListaGet(); // Own version 1/2
  console.log( 'Procesando: ', usrsList);
  res.json({
    ok: true,
    msg: 'Procesando...',
    usrsList,                                      // Own version 2/2
    clientes: usersOnLine.usuariosListaGet()       // Video Version
  })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalles', ( req: Request, res: Response) => {
  // Cambia contenido de la propiedad privada en el servidor
  // usersOnLine['lista'] = 
  // [
  //   {
  //     id: 'GdHAJlnbc2Yg4HZAAAAq',
  //     nombre: 'Connie-Hacked',
  //     sala: 'sin-asignar'
  //   },
  //   {
  //     id: 'F5mkuwAiW2uBddYiAAAr',
  //     nombre: 'Amanda-Hacked',
  //     sala: 'sin-asignar'
  //   }
  // ];
  console.log(usersOnLine.usuariosListaGet());
  res.json({
    ok: true,
    usersOnLine,
    clientes: usersOnLine,
    listado: usersOnLine['lista']  // <- Propiedad privada de la clase
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
