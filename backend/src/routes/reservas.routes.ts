import { Router } from "express";
import { getAllReservas, createReservas, updateReservas, deleteReservas, updateEstadoReservas, getAllReservasByUser } from "../controllers/reservas.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get('/reservas',verifyToken, getAllReservas);
router.get('/reservas/:id',verifyToken, getAllReservasByUser);
router.post('/reservas',verifyToken, createReservas);
router.put('/reservas/:id',verifyToken, updateReservas);
router.put('/reservas',verifyToken, updateEstadoReservas);
router.delete('/reservas/:id',verifyToken, deleteReservas);

export default router;