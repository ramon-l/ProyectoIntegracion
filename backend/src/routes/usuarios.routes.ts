import { Router } from "express";
import { getAllUsuarios, createUsuarios, updateUsuarios, deleteUsuarios, getUsuarioById } from "../controllers/usuarios.controllers";
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.get('/usuarios', verifyToken, getAllUsuarios);
router.get('/usuarios/:id', verifyToken, getUsuarioById);
router.post('/usuarios', verifyToken, createUsuarios);
router.put('/usuarios/:id', verifyToken, updateUsuarios);
router.delete('/usuarios/:id', verifyToken, deleteUsuarios);

export default router;