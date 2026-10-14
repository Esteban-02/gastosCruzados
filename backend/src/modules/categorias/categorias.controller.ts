import type { Request, Response, NextFunction } from 'express';
import * as service from "./categorias.service.js";
import type { ActualizarCategoriaDTO, Categoria, CrearCategoriaDTO } from './categorias.types.js';

export async function buscarPorId(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ error: 'El id debe ser un numero entero positivo' });
            return;
        }

        const categoria = await service.buscarPorId(id);
        res.status(200).json({ categoria });
    } catch (error) {
        next(error);
    }
}

export async function crearCategoria(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    console.log("Crear categoria");
    
    try {
        const { nombre, tipo, } = req.body;
        if (typeof nombre !== 'string' || !nombre.trim() || (tipo !== 'gasto' && tipo !== 'ingreso')) {
            console.log("Error en crear categoria");
            
            res.status(400).json({ error: 'El nombre y el tipo son obliatorios para crear la Categoria' });
            return;
        }

        const datos: CrearCategoriaDTO = {
            nombre: nombre.trim(),
            tipo,
        }
        const crearCategoria = await service.crearCategoria(datos);
        console.log("Resultado de crear categoria: ", crearCategoria);
        
        res.status(201).send('Categoria creada');
    } catch (error) {
        console.log("Error en crear categoria: ", error);
        
        next(error);
    }
}

export async function listar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { tipo } = req.query;
        if ( tipo !== undefined && tipo !== 'gasto' && tipo !== 'ingreso') {
            res.status(400).send('Error en el tipo de categoria');
            return;
        }
        console.log("tipo", tipo)
        const listadoCategorias = await service.listar(tipo);

        res.status(200).json({listadoCategorias});
    } catch (error) {
        next(error);
    }
}

export async function eliminarCategoria(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        console.log("id: ", id);
        
        if (id <= 0 || typeof id !== 'number') {
            res.status(400).json('No se encontro un id para eliminar la categoria')
        }

        const idEliminarCategoria = await service.eliminar(id);
        res.status(200).json(idEliminarCategoria)
    } catch (error) {
        next(error);
    }
}

export async function actualizar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const id = Number(req.params);
        if (id <= 0 || typeof id !== 'number') {
            res.status(400).send('Sin id');
        }

        const { nombre, tipo } = req.body;
        if (nombre && tipo === undefined || tipo === undefined || tipo !== 'gasto' || tipo !== 'ingreso') {
            res.status(400).send('Datos erroneos');
        }
        const datos: ActualizarCategoriaDTO = {
            nombre: nombre.trim(),
            tipo,
        }

        await service.actualizar(datos, id);
        res.status(200).send('Categoria actualizada');

    } catch (error) {
        next(error);
    }

}