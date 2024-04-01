import UserSchema from "../models/user.js";
import zxcvbn from "zxcvbn";

export const emailExists = async (email = '') => {
    try {
        const emailExists = await UserSchema.findOne({ email });
        if (emailExists) {
            throw new Error(`Correo electrónico "${email}" ya registrado. Elige otro.`);
        }
    } catch (error) {
        throw error;
    }
}

export const usernameExists = async (username = '') => {
    try {
        const usernameExists = await UserSchema.findOne({ username });
        if (usernameExists) {
            throw new Error(`Nombre de usuario "${username}" ya registrado. Elige otro.`);
        }
    } catch (error) {
        throw error;
    }
}

export const validatePassword = async (password = '') => {
    const result = zxcvbn(password);

    if (result.score < 2) {
        throw new Error(`La contraseña no es lo suficientemente segura.`);
    }
    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }
};

