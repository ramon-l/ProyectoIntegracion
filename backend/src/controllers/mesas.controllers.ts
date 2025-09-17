import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Listar todos las mesas
export const getAllMesas = async (req: Request, res: Response) => {
    const mesas = await prisma.mesas.findMany();
    res.json(mesas);
};

//Crear mesa
export const createMesas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { capacidad, numeroMesa, ubicacion, estado } = req.body;
        const mesa = await prisma.mesas.create({ data: { capacidad, numeroMesa, ubicacion, estado} });
        res.json(mesa);
    } catch (error) {
        next(error);
    }
};

//Actualizar mesa
export const updateMesas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {  capacidad, numeroMesa, ubicacion, estado} = req.body;
        const mesa = await prisma.mesas.update({
            where: { id: Number(id) },
            data: {  capacidad, numeroMesa, ubicacion, estado },
        });
        res.json(mesa);
    } catch (error) {
        next(error);
    }
};

//Eliminar mesa
export const deleteMesas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.mesas.delete({ where: { id: Number(id) } });
        res.json({ message: 'mesa eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};