import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Obtener mesa
export const getMesaById = async (id:number) => {
    return await prisma.mesas.findUnique({ where: { id: Number(id) } });
}