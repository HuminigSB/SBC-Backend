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

const routes = new Router();

// Autenticação
routes.post('/login', LoginController.store);
routes.get('/login', LoginController.index);

// Usuario
routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.put('/user/:id', UserController.update);
routes.delete('/user', UserController.delete);

//Bilhete
routes.post('/bilhete', BilheteController.store);
routes.get('/bilhete', BilheteController.index);
routes.put('/bilhete', BilheteController.update);
routes.delete('/bilhete', BilheteController.delete);

//Cinema
routes.post('/cinema', CinemaController.store);
routes.get('/cinema', CinemaController.index);
routes.put('/cinema', CinemaController.update);
routes.delete('/cinema', CinemaController.delete);

//Combo
routes.post('/combo', ComboController.store);
routes.get('/combo', ComboController.index);
routes.put('/combo', ComboController.update);
routes.delete('/combo', ComboController.delete);

//Endereco
routes.post('/combo', EnderecoController.store);
routes.get('/combo', EnderecoController.index);
routes.put('/combo', EnderecoController.update);
routes.delete('/combo', EnderecoController.delete);

//Poltrona
routes.post('/combo', PoltronaController.store);
routes.get('/combo', PoltronaController.index);
routes.put('/combo', PoltronaController.update);
routes.delete('/combo', PoltronaController.delete);

//Reserva
routes.post('/reserva', ReservaController.store);
routes.get('/reserva', ReservaController.index);
routes.put('/reserva', ReservaController.update);
routes.delete('/reserva', ReservaController.delete);

//Sala
routes.post('/sala', SalaController.store);
routes.get('/sala', SalaController.index);
routes.put('/sala', SalaController.update);
routes.delete('/sala', SalaController.delete);

//Sessao
routes.post('/sessao', SessaoController.store);
routes.get('/sessao', SessaoController.index);
routes.put('/sessao', SessaoController.update);
routes.delete('/sessao', SessaoController.delete);

export default routes;
