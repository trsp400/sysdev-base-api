import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/users',  (req, res) => {
    return res.json({message: "OIEE"});
});

routes.post('/');
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

export default routes;

