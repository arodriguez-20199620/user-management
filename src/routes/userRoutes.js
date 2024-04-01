import { check } from 'express-validator';
import { Router } from 'express';

import { validateFields } from '../middlewares/validate-fields.js';
import { emailExists, usernameExists, validatePassword } from '../middlewares/validate-user.js';


import { register, login } from '../controllers/userController.js';

const router = Router();


router.post(
    '/register',
    [
        check('email', 'El campo de correo electrónico no puede estar vacío').notEmpty(),
        check('email').custom(emailExists),
        check('username', 'El campo de usuario no puede estar vacío').notEmpty(),
        check('username').custom(usernameExists),
        check('password', 'El campo de contraseña no puede estar vacío').notEmpty(),
        check('password').custom(validatePassword),
        check('name', 'El campo nombre no puede estar vacío').notEmpty(),
        check('lastname', 'El campo apellido no puede estar vacío').notEmpty(),
        validateFields,
    ],
    register
);


router.post(
    '/login',
    [
        check('UsernameOrEmail', 'Please enter your email or your username.').notEmpty(),
        check('password', 'Please enter your password.').notEmpty(),
        validateFields,
    ], login)
export default router