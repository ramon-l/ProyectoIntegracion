import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Listar todas las mesas de forma paginada
export const getAllMesas = async (req: Request, res: Response) => {
    const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
    const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
    const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

    const data = await prisma.mesas.findMany(
        {
            skip: skip_,
            take: tam,
            orderBy: {
                numeroMesa: "asc"
            },
        }
    );

    const totalItem = await prisma.mesas.count();  // Contar el total de mesas
    const totalPag = Math.ceil(totalItem / tam); // Calcular el número total de páginas
    const currentPage = pag;
    
    res.json({
        data,
        paginacion: {
            currentPage,
            totalItem,
            totalPag
        },
    });
};

//Obtener mesa
export const getMesaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const mesa = await prisma.mesas.findUnique({ where: { id: Number(id) } });
        if (!mesa) {
            return res.status(401).json({ error: "No se encuentra mesa" });
        }
        const { capacidad, numeroMesa, ubicacion, estado } = mesa;
        res.json({ capacidad, numeroMesa, ubicacion, estado });
    } catch (error) {
        next(error);
    }
}
//Crear mesa
export const createMesas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { capacidad, numeroMesa, ubicacion, estado } = req.body;
        const mesa = await prisma.mesas.create({ data: { capacidad:Number(capacidad), 
            numeroMesa:Number(numeroMesa), ubicacion, estado } });
        res.json(mesa);
    } catch (error) {
        next(error);
    }
};

//Actualizar mesa
export const updateMesas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { capacidad, numeroMesa, ubicacion, estado } = req.body;
        const mesa = await prisma.mesas.update({
            where: { id: Number(id) },
            data: { capacidad: Number(capacidad), numeroMesa: Number(numeroMesa), ubicacion, estado },
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