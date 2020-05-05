import { Router } from 'express';

const routes = new Router();

routes.get('/users', (req, res) => {
    return res.json({message: "OIEE"});
});

routes.post('/');
routes.post('/sessions');
routes.post('/users');

export default routes;