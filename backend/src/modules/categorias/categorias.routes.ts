import { Router } from "express";
import * as controller from './categorias.controller.js';

const router = Router();

router.get('/',         controller.listar);
router.get('/:id',      controller.buscarPorId);
router.post('/',        controller.crearCategoria);
router.put('/',         controller.actualizar);
router.delete('/:id',   controller.eliminarCategoria);

export default router;
