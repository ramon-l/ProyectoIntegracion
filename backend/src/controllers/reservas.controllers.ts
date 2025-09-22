import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { getMesaById } from '../services/mesas.services';

const prisma = new PrismaClient();

//Listar todos las reservas
export const getAllReservas = async (req: Request, res: Response) => {
    const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
    const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
    const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

    const data = await prisma.reservas.findMany(
        {
            skip: skip_,
            take: tam,
            select: {
                id: true,
                fechaReserva: true,
                horaInicioReserva: true,
                horaFinReserva: true,
                estadoReserva: true,
                cantidadPersonas: true,
                fechaSolicitado: true,
                mesa: {
                    select: {
                        capacidad: true
                    }
                },
                usuario: {
                    select: {
                        nombre: true
                    }
                }
            },
            orderBy: {
                fechaReserva: "asc"
            },
        }
    );

    const totalItem = await prisma.reservas.count();  // Contar el total de reservas
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

//Listar todos las reservas relacionadas a un usuario
export const getAllReservasByUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
    const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
    const skip_ = (pag - 1) * tam; // Calcular el desplazamiento
    console.log(req);
    console.log(id, pag, tam, skip_);
    const data = await prisma.reservas.findMany(
        {
            select: {
                id: true,
                fechaReserva: true,
                horaInicioReserva: true,
                horaFinReserva: true,
                estadoReserva: true,
                cantidadPersonas: true,
                fechaSolicitado: true,
                mesa: {
                    select: {
                        capacidad: true
                    }
                },
                usuario: {
                    select: {
                        nombre: true
                    }
                }
            },
            where: {
                idUsuario: Number(id)
            },
            orderBy: {
                fechaReserva: "asc"
            },
            skip: skip_,
            take: tam,
        }
    );

    const totalItem = await prisma.reservas.count();  // Contar el total de reservas
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

//Crear reserva
export const createReservas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
            cantidadPersonas, fechaSolicitado, idMesa, idUsuario } = req.body;

        // Validar capacidad de mesa por cantidad de persona
        const mesa = await getMesaById(idMesa);

        if (!mesa) {
            return res.status(404).json({ error: "La mesa no existe" });
        }

        if (cantidadPersonas > mesa.capacidad) {
            return res.status(400).json({
                error: `La mesa tiene capacidad máxima de ${mesa.capacidad} personas, y se intentó reservar para ${cantidadPersonas}.`,
            });
        }
        //let horaIni = new Date(horaFinReserva).toLocaleTimeString() ;
        //let horaFin = new Date(horaInicioReserva).toLocaleTimeString()
        // valida que la mesa no este ocupada en la fecha y hora al crear la reserva
        const reservasExistentes = await prisma.reservas.findMany({
            where: {
                idMesa : Number(idMesa),
                fechaReserva: new Date(fechaReserva)/*,
                AND: [
                    { horaInicioReserva: { lt:  horaIni} },
                    { horaFinReserva: { gt: horaFin } },
                ],*/
            },
        });

        if (reservasExistentes.length > 0) {
            return res.status(400).json({ error: 'La mesa ya está reservada en ese horario.' });
        }

        // Si las validaciones anteriores estan correctas se crea la reserva
        const reserva = await prisma.reservas.create({
            data: {
                fechaReserva: new Date(fechaReserva), horaInicioReserva, horaFinReserva, estadoReserva,
                cantidadPersonas: Number(cantidadPersonas), fechaSolicitado, idMesa: Number(idMesa),
                idUsuario: Number(idUsuario)
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
            cantidadPersonas, fechaSolicitado, idMesa, idUsuario } = req.body;
        const reserva = await prisma.reservas.update({
            where: { id: Number(id) },
            data: {
                fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
                cantidadPersonas, fechaSolicitado, idMesa, idUsuario
            },
        });
        res.json(reserva);
    } catch (error) {
        next(error);
    }
};

//Actualizar reserva
export const updateEstadoReservas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.query.id || "");
        const estado = String(req.query.estado || "");
        if (!id || !estado) {
            return res.status(400).json({ status: "error", message: " id y estado son requeridos" });
        }
        const reserva = await prisma.reservas.update({
            where: { id: Number(id) },
            data: {
                estadoReserva: estado
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