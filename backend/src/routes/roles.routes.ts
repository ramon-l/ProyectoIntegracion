import { Router } from "express";
import { getAllRoles, createRoles, updateRoles, deleteRoles } from "../controllers/roles.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get('/roles',verifyToken, getAllRoles);
router.post('/roles',verifyToken, createRoles);
router.put('/roles/:id',verifyToken, updateRoles);
router.delete('/roles/:id',verifyToken, deleteRoles);

export default router;