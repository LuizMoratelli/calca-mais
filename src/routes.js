import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

// routes to users
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/{user}', UserController.show);
routes.put('/users/{user}', UserController.update);
routes.delete('/users/{user}', UserController.delete);

export default routes;