//listar, buscarPorId, crear, actualizar y eliminar

import pool from './../../config/database.js'
import type { Categoria, CrearCategoriaDTO, TipoCategoria } from './categorias.types.js'

export async function listar (): Promise <Categoria[]> {
    const { rows } = await pool.query<Categoria> (
        'SELECT * FROM categorias ORDER BY ID DESC' 
    );
    return rows;
} 