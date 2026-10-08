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