import { Router } from "express";
import { getAllMesas, createMesas, updateMesas, deleteMesas } from "../controllers/mesas.controllers";

const router = Router();

router.get('/mesas', getAllMesas);
router.post('/mesas', createMesas);
router.put('/mesas/:id', updateMesas);
router.delete('/mesas/:id', deleteMesas);

export default router;