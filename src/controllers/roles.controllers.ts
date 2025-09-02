import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Listar todos los roles
export const getAllRoles = async (req: Request, res: Response) => {
    const roles = await prisma.roles.findMany();
    res.json(roles);
};

//Crear rol
export const createRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, descripcion } = req.body;
        const rol = await prisma.roles.create({ data: { nombre, descripcion } });
        res.json(rol);
    } catch (error) {
        next(error);
    }
};

//Actualizar rol
export const updateRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const rol = await prisma.roles.update({
            where: { id: Number(id) },
            data: { nombre, descripcion },
        });
        res.json(rol);
    } catch (error) {
        next(error);
    }
};

//Eliminar rol
export const deleteRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.roles.delete({ where: { id: Number(id) } });
        res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};
