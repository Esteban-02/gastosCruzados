//listar, buscarPorId, crear, actualizar y eliminar

import pool from './../../config/database.js'
import type { Categoria, CrearCategoriaDTO, TipoCategoria } from './categorias.types.js'

export async function listar (): Promise <Categoria[]> {
    const { rows } = await pool.query<Categoria> (
        'SELECT * FROM categorias ORDER BY ID DESC' 
    );
    return rows;
}

export async function buscarPorId(id_categoria: number): Promise <Categoria | null > {
    const { rows } = await pool.query<Categoria>(
        'SELECT * FROM categoria WHERE $1',
        [id_categoria]
    );
    return rows[0] ?? null;
}

export async function crear(nombre: string, tipo: TipoCategoria): Promise <CrearCategoriaDTO | null> {
    const { rows } = await pool.query<CrearCategoriaDTO> (
        'INSERT INTO categorias (nombre, tipo) VALUES ($1, $2) RETURNING id,nombre, tipo',
        [nombre, tipo]
    );

    if (rows.length === 0){
        throw new Error ("NO se pudo crear la catogoria");
    }
    return rows[0] ?? null;
}


export async function actualizar(id_categoria: number, nombre: string, tipo: TipoCategoria): Promise <Categoria | null> {
    const { rows } = await pool.query<Categoria>(
        'UPDATE categoria SET nombre, tipo Where id_categoria = $1',
        [id_categoria]
    );

    if(rows.length === 0){
        throw new Error ("No es posible hacer la actualizacion");
    }
    return rows[0] ?? null;
}

