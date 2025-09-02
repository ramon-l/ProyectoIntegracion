import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Listar todos los usuarios
export const getAllUsuarios = async (req: Request, res: Response) => {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
};

//Crear usuario
export const createUsuarios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, apellido, correo, telefono, rolId } = req.body;
        const usuarios = await prisma.usuarios.create({ data: { nombre, apellido, correo, telefono, rolId } });
        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

//Eliminar usuario
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

