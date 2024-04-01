import bcryptjs from 'bcryptjs';
import UserSchema from '../models/user.js';
import { generateToken } from '../../configs/generateToken.js';


export const register = async (req, res) => {
    const { email, username, password, name, lastname } = req.body;

    const user = new UserSchema({ email, username, password, name, lastname });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.status(201).json({
        msg: 'user created successfully',
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        lastname: user.lastname
    })
}


export const login = async (req, res) => {
    const { UsernameOrEmail, password } = req.body;

    try {
        const user = await UserSchema.findOne({
            $or: [
                { mail: UsernameOrEmail },
                { username: UsernameOrEmail }
            ]
        });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email is incorrect",
            });
        }

        // verificar si el usuario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        // generar el JWT
        const token = await generateToken(user.id);


        res.status(200).json({
            msg: 'Successful authentication',
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}