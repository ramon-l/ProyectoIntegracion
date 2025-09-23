import { Router } from "express";
import { getAllMesas, createMesas, updateMesas, deleteMesas, getMesaById } from "../controllers/mesas.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get('/mesas', verifyToken, getAllMesas);
router.get('/mesas/:id',verifyToken, getMesaById);
router.post('/mesas',verifyToken, createMesas);
router.put('/mesas/:id',verifyToken, updateMesas);
router.delete('/mesas/:id',verifyToken, deleteMesas);

export default router;