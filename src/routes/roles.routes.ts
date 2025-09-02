import { Router } from "express";
import { getAllRoles, createRoles, updateRoles, deleteRoles } from "../controllers/roles.controllers";

const router = Router();

router.get('/roles', getAllRoles);
router.post('/roles', createRoles);
router.put('/roles/:id', updateRoles);
router.delete('/roles/:id', deleteRoles);

export default router;