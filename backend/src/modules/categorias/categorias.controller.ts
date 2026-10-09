import type {Request, Response, NextFunction} from 'express';
import * as service from "./categorias.service.js";
import type { Categoria, CrearCategoriaDTO } from './categorias.types.js';

export async function buscarPorId(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise <void> {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({error: 'El id debe ser un numero entero positivo'});
            return;
        }

        const categoria = await service.buscarPorId(id);
        res.status(200).json({categoria});
    } catch (error) {
        next(error);
    }
}


export async function crearCategoria (
    req: Request,
    res: Response,
    next: NextFunction
): Promise <void> {
    try {
        const { nombre, tipo,} = req.body;
        if (typeof nombre != 'string' || !nombre.trim() || (tipo !== 'gasto' && tipo !== 'ingreso')) {
            res.status(400).json({error: 'El nombre y el tipo son obliatorios para crear la Categoria'});
            return;
        }

        const datos : CrearCategoriaDTO = {
            nombre: nombre.trim(),
            tipo,
        }
        const crearCategoria = await service.crearCategoria(datos);
        res.status(200).json({crearCategoria});
    } catch (error) {
        next(error);
    }
}


export async function listar(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const tipo = req.body;
        const listadoCategorias = await service.listar();
        if (listadoCategorias.length === 0) {
            next('No hay categorias para listar');
            res.status(500).json('No se encontraron categorias para listar');
        }
        res.status(200).json(listadoCategorias);
    } catch (error) {
        next(error);
    }
}

export async function eliminarCategoria(req: Request, res: Response, next: NextFunction) {
    try {
        const idCategoria = req.body;
        if (idCategoria <= 0 || typeof idCategoria != 'number') {
            res.status(500).json('No se encontro un id para eliminar la categoria')
        }

        const idEliminarCategoria = await service.eliminar(idCategoria);
        res.status(200).json(idEliminarCategoria)
    } catch (error) {
        next(error);
    }
}

export async function actualizar(req: Request, res: Response, next: NextFunction): Promise <void> {

}