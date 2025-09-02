import { Router } from "express";
import { getAllUsuarios, createUsuarios, updateUsuarios, deleteUsuarios } from "../controllers/usuarios.controllers";

const router = Router();

router.get('/usuarios', getAllUsuarios);
router.post('/usuarios', createUsuarios);
router.put('/usuarios/:id', updateUsuarios);
router.delete('/usuarios/:id', deleteUsuarios);

export default router;