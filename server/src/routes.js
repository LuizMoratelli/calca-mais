import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import authMidleware from  './app/midleware/auth';
import SessionController from './app/controllers/SessionController';
const routes = new Router();

routes.post('/usuarios', UsuarioController.store);
// routes.post('/sessions', SessionController.store);

// routes.use(authMidleware);
// routes.get('/usuarios', UsuarioController.index);
// routes.get('/usuarios/:id', UsuarioController.show);
// routes.put('/usuarios/:id', UsuarioController.update);
// routes.delete('/usuarios/:id', UsuarioController.delete);

export default routes;
