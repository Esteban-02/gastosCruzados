import * as repo from './categorias.repository.js';
import { NotFoundError, ConflictError, esErrorPostgres, AppError } from '../../shared/errores/AppError.js';
import type { ActualizarCategoriaDTO, Categoria, CrearCategoriaDTO } from './categorias.types.js';

/**
 * Buscar categorias por ID
 * @param id_categoria 
 * @returns 
 */
export async function buscarPorId(id_categoria: number): Promise<Categoria> {
    const categoria = await repo.buscarPorId(id_categoria);
    if (!categoria) {
        throw new NotFoundError('Categoria');
    }
    return categoria;
}

/**
 * Crear una nueva categoria
 * @param datos 
 * @returns 
 */
export async function crearCategoria(datos: CrearCategoriaDTO): Promise<Categoria> {
    const buscarCategoria = await repo.buscarPorNombre(datos.nombre);
    if (buscarCategoria !== null) {
        throw new NotFoundError(`Ya existe una categoria llamada ${datos.nombre}`);
    }

    const nuevaCategoria = await repo.crear(datos);
    return nuevaCategoria!;
}

/**
 * Actualizar categoria
 * @param datos 
 * @returns 
 */
export async function actualizar(datos: ActualizarCategoriaDTO, id_categoria: number): Promise<Categoria | null> {
    if (Object.keys(datos).length === 0) {
        throw new AppError ('Debe enviar al menos un campo para actualizar', 400);
    }
    const buscarCategoria = await buscarPorId(id_categoria);
    if (buscarCategoria == null) {
        throw new ConflictError('No hay existe categoria para actualizar');
    };

    const actualizarCategoria = await repo.actualizar(datos, id_categoria);
    return actualizarCategoria ?? null;
}

/**
 * Elimina y maneja el error en caso de que la categoria tenga asociado movimientos
 * @param id_categoria 
 */
export async function eliminar(id_categoria: number): Promise<void> {
    try {
        const buscarCategoria = await repo.buscarPorId(id_categoria);
        if (buscarCategoria == null) {
            throw new NotFoundError('La categoria no existe');
        }

        const eliminar = await repo.eliminar(id_categoria);
        if (!eliminar) {
            throw new NotFoundError(
                `No fue posible eliminar la categoria ${buscarCategoria.nombre}`
            );
        }
    } catch (error) {
        if (esErrorPostgres(error) && error.code === '23503') {
            throw new ConflictError('No fue posible eliminar la categoria porque tiene movimientos asociados');
        }
        throw error;
    }
}
