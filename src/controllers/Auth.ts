import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

// Opciones para la cookie del refresh token
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true si estás en producción
    sameSite: 'strict' as const,
    path: '/auth', // Solo se envía a las rutas que empiezan por /auth
    maxAge: REFRESH_TOKEN_MAX_AGE
};

// Función para registrar un usuario nuevo
const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await AuthService.register(req.body);

        // 201 porque se ha creado un recurso nuevo
        res.status(201).json({ user });
    } catch (error) {
        // Si el email ya existe, el ErrorHandler responde 409
        next(error);
    }
};

// Función para iniciar sesión
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.login(req.body.email, req.body.password);

        if (result) {
            // Extraemos los datos del resultado (asumiendo que AuthService devuelve { token, refreshToken, user })
            const { token, refreshToken, user } = result as any;

            // Guardamos el refresh token en una cookie segura
            res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

            // Devolvemos SOLO el access token y el user
            res.status(200).json({ token, user });
        } else {
            // 401: no se ha podido identificar al usuario
            res.status(401).json({ message: 'Email o contraseña incorrectos' });
        }
    } catch (error) {
        next(error);
    }
};

// Función para pedir un access token nuevo con el refresh token
const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Leemos el refresh token de la cookie en lugar del body
        const refreshToken = req.cookies?.refreshToken;

        // 2. Si no hay cookie, rechazamos inmediatamente con 401
        if (!refreshToken) {
            return res.status(401).json({ message: 'No se ha proporcionado un refresh token' });
        }

        const result = await AuthService.refresh(refreshToken);

        if (result) {
            // Devolvemos solo { token }
            res.status(200).json(result);
        } else {
            // Si el usuario ya no existe, borramos la cookie para limpiar el estado
            res.clearCookie('refreshToken', { path: '/auth' });
            res.status(401).json({ message: 'El usuario ya no existe' });
        }
    } catch (error) {
        // Si el refresh token está caducado o no es válido, borramos la cookie
        res.clearCookie('refreshToken', { path: '/auth' });
        next(error);
    }
};

// Función para cerrar sesión (Añadida según los requisitos)
const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Borramos la cookie que contiene el refresh token
        res.clearCookie('refreshToken', { path: '/auth' });
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
        next(error);
    }
};

export default { register, login, refresh, logout };
