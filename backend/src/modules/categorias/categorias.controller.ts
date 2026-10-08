import type {Request, Response, NextFunction} from 'express';
import * as sevice from "./categorias.service.js";

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


export async function buscarPorNombre(
    req: Request,
    res: Response,
    next: NextFunction
): Promise <void> {
    try {
        const nombreCategoria = req.params.nombre;
        if (nombreCategoria === null) {
            res.status(400).json({error: 'Error, ingresar nombre a buscar'});
            return;
        }

        const buscarCatNombre = await service.buscarPorNombre(nombreCategoria);
        res.status(200).json({buscarCatNombre});

    } catch (error) {
        next(error);
    }
}


export async funtion crearCategoria (
    req: Request,
    res: Response,
    next: NextFunction
): Promise <void> {
    try {
        const { nombre, tipo,} = req.params.categoria;
        if (categoria === null) {
            res.status(400).json({error: 'Sin datos para crear categoria'});
            return;
        }
        const crearCategoria = await service.crearCategoria(CrearCategoriaDTO)
    } catch (error) {
        
    }
}