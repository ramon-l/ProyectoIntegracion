import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Listar todos las reservas
export const getAllReservas = async (req: Request, res: Response) => {
    const reservas = await prisma.reservas.findMany();
    res.json(reservas);
};

//Crear reserva
export const createReservas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
            cantidadPersonas, fechaSolicitado, idMesa, idUsuario, idAdmin } = req.body;
        const reserva = await prisma.reservas.create({
            data: {
                fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
                cantidadPersonas, fechaSolicitado, idMesa, idUsuario, idAdmin
            }
        });
        res.json(reserva);
    } catch (error) {
        next(error);
    }
};

//Actualizar reserva
export const updateReservas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
            cantidadPersonas, fechaSolicitado, idMesa, idUsuario, idAdmin } = req.body;
        const reserva = await prisma.reservas.update({
            where: { id: Number(id) },
            data: {
                fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
                cantidadPersonas, fechaSolicitado, idMesa, idUsuario, idAdmin
            },
        });
        res.json(reserva);
    } catch (error) {
        next(error);
    }
};

//Eliminar reserva
export const deleteReservas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await prisma.reservas.delete({ where: { id: Number(id) } });
        res.json({ message: 'reserva eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};