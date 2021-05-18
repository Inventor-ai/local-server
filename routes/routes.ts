import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response) => {
   res.json({
       ok: true,
       msg: 'Servicio GET running ok'
   });
});

router.post('/mensajes', (req: Request, res: Response) => {    
  const cuerpo = req.body.cuerpo;  
  const de     = req.body.de;
  res.json ({
      ok: true,
      msg: 'Servicio POST running ok',
      cuerpo,
      de
  });
});

// 

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de     = req.body.de;
  const id     = req.params.id;
  const params = req.params;
  res.json ({
      ok: true,
      msg: 'Servicio POST with URL params running ok',
    //   cuerpo: cuerpo, // Puede expresarse así
      cuerpo,            // pero es más simple así
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
      msg: 'Servicio DETELE running ok'
  });
});

export default router;
