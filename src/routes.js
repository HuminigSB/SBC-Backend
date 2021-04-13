import {Router} from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController'
import BilheteController from './app/controllers/BilheteController';
import PoltronaController from './app/controllers/PoltronaController';
import SalaController from './app/controllers/SalaController';
import SessaoController from './app/controllers/SessaoController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Autenticação
routes.post('/login', LoginController.store);
routes.post('/user', UserController.store);

// Token de autenticação
routes.use(authMiddleware);

// Usuario
routes.get('/login/:id', LoginController.index);
routes.get('/user', UserController.index);
routes.put('/user/:id', UserController.update);
routes.delete('/user', UserController.delete);

//Bilhete
routes.post('/bilhete', BilheteController.store);
routes.get('/bilhete/:id_sessao', BilheteController.index);
routes.put('/bilhete', BilheteController.update);

//Poltrona
routes.post('/poltrona', PoltronaController.store);
routes.get('/poltrona/:id', PoltronaController.index);
routes.put('/poltrona/:id', PoltronaController.update);
routes.delete('/poltrona/:id', PoltronaController.delete);

//Sala
routes.post('/sala', SalaController.store);
routes.get('/sala', SalaController.index);
routes.delete('/sala', SalaController.delete);

//Sessao
routes.post('/sessao', SessaoController.store);
routes.get('/sessao/:id', SessaoController.index);
routes.put('/sessao/:id', SessaoController.update);
routes.delete('/sessao/:id', SessaoController.delete);

export default routes;
