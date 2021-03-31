import {Router} from 'express';

import UserController from './app/controllers/UserController';
import LoginController from './app/controllers/LoginController'
import BilheteController from './app/controllers/BilheteController';
import CinemaController from './app/controllers/CinemaController';
import ComboController from './app/controllers/ComboController';
import EnderecoController from './app/controllers/EnderecoController';
import PoltronaController from './app/controllers/PoltronaController';
import ReservaController from './app/controllers/ReservaController';
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
routes.delete('/bilhete', BilheteController.delete);

//Poltrona
routes.post('/poltrona', PoltronaController.store);
routes.get('/poltrona/:id', PoltronaController.index);
routes.put('/poltrona/:id', PoltronaController.update);
routes.delete('/poltrona/:id', PoltronaController.delete);

//Sala
routes.post('/sala', SalaController.store);
routes.get('/sala', SalaController.index);
routes.delete('/sala', SalaController.delete);

//Cinema
routes.post('/cinema', CinemaController.store);
routes.get('/cinema', CinemaController.index);
routes.put('/cinema', CinemaController.update);
routes.delete('/cinema', CinemaController.delete);

//Combo
routes.post('/combo', ComboController.store);
routes.get('/combo/:id', ComboController.index);

//Endereco
routes.post('/endereco', EnderecoController.store);
routes.get('/endereco', EnderecoController.index);
routes.put('/endereco', EnderecoController.update);
routes.delete('/endereco', EnderecoController.delete);

//Reserva
routes.post('/reserva', ReservaController.store);
routes.get('/reserva', ReservaController.index);
routes.put('/reserva', ReservaController.update);
routes.delete('/reserva', ReservaController.delete);

//Sessao
routes.post('/sessao', SessaoController.store);
routes.get('/sessao/:id', SessaoController.index);
routes.put('/sessao/:id', SessaoController.update);
routes.delete('/sessao/:id', SessaoController.delete);

export default routes;
