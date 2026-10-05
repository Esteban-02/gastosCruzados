//listar, buscarPorId, crear, actualizar y eliminar

import pool from './../../config/database.js'
import type { Categoria, CrearCategoriaDTO, TipoCategoria } from './categorias.types.js'

export async function listar (tipo ?: TipoCategoria): Promise <Categoria[]> {
    const { rows } = await pool.query<Categoria> (
        `SELECT * FROM categorias
        WHERE ($1 :: text IS NULL OR tipo = $1 ) 
        ORDER BY nombre`,
        [tipo ?? null]
    );
    return rows;
}

export async function buscarPorId(id_categoria: number): Promise <Categoria | null > {
    const { rows } = await pool.query<Categoria>(
        'SELECT * FROM categorias WHERE id_categoria = $1',
        [id_categoria]
    );
    return rows[0] ?? null;
}

export async function crear(datos: CrearCategoriaDTO): Promise <Categoria | null> {
    const { rows } = await pool.query<Categoria> (
        'INSERT INTO categorias (nombre, tipo) VALUES ($1, $2) RETURNING *',
        [datos.nombre, datos.tipo]
    );
    return rows[0] ?? null;
}

export async function actualizar(datos: CrearCategoriaDTO, id_categoria: number): Promise <Categoria | null> {
    const { rows } = await pool.query<Categoria>(
        `UPDATE categorias 
        SET nombre = COALESCE($1, nombre), 
            tipo = COALESCE($2, tipo) 
        WHERE id_categoria = $3
        RETURNING *`,
        [datos.nombre, datos.tipo, id_categoria]
    );
    return rows[0] ?? null;
}

export async function eliminar(id_categoria:number): Promise <boolean>{
    const { rowCount } = await pool.query(
        'DELETE FROM categorias where id_categoria = $1',
        [id_categoria]
    );
    
    return rowCount === 1;
}
