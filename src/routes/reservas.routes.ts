import { Router } from "express";
import { getAllReservas, createReservas, updateReservas, deleteReservas } from "../controllers/reservas.controllers";

const router = Router();

router.get('/reservas', getAllReservas);
router.post('/reservas', createReservas);
router.put('/reservas/:id', updateReservas);
router.delete('/reservas/:id', deleteReservas);

export default router;