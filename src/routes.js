import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ResetPasswordController from './app/controllers/ResetPasswordController';

import multerConfig from './config/multer';
import userAuth from './app/middlewares/userAuth';

const routes = new Router();
const upload = multer(multerConfig);

// user routes
routes.post('/');
routes.post('/sessions', SessionController.store);  // create session/login
routes.post('/users', UserController.store);        // create user
routes.put('/users',userAuth, UserController.update); // edit user
routes.get('/users',userAuth, UserController.index); // edit user
routes.put('/resetpass', ResetPasswordController.update);

//files
routes.post('/files',upload.single('file'), FileController.store);

export default routes;

