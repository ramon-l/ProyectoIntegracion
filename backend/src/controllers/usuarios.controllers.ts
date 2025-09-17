import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

//Listar todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
};

//Obtener usuario
export const getUsuarioById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } =  req.params;
        const user = await prisma.usuarios.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return res.status(401).json({ error: "No se encuentra usuario" });
        }
        const {nombre, apellido, correo, telefono} =  user;
        res.json( {nombre, apellido, correo, telefono});
    } catch (error) {
        next(error);
    }
}

//Crear usuario
export const createUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, apellido, correo, telefono, password, rolId } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const usuarios = await prisma.usuarios.create({ data: { nombre, apellido, correo, telefono, password: hashPassword, rolId: Number(rolId) } });
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

//Actualizar usuario
export const updateUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, telefono, rolId } = req.body;
        const usuarios = await prisma.usuarios.update({
            where: { id: Number(id) },
            data: { nombre, apellido, correo, telefono, rolId },
        });
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

//Borrar usuario
export const deleteUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.usuarios.delete({ where: { id: Number(id) } });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};