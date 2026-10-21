import type { Categoria } from '../categorias/categorias.types.js';
import pool from './../../config/database.js';
import type { ActualizarGastoDTO, crearGastoDTO, Gasto } from './gastos.types.js';

export async function listar(id_categoria?: number): Promise <Gasto[]> {
    const { rows } = await pool.query<Gasto>(
        `SELECT * FROM gastos
        WHERE ($1 :: TEXT IS NULL or id_categoria = $1 )
        ORDER BY creado_en`,
        [id_categoria ?? 0]
    );
    return rows;
}

export async function buscarPorId(id_gasto: number): Promise <Gasto | null>{
    const { rows } = await pool.query<Gasto>(
        `SELECT * FROM gasto
        WHERE id_gasto = $1`,
        [id_gasto],
    );
    return rows[0] ?? null;
}

export async function crear(crearGasto: crearGastoDTO): Promise<Gasto> {
    const { rows } = await pool.query <Gasto> (
        `INSERT INTO gasto (nombre, id_categoria, descripcion, monto, fecha) 
            VALUES ($1, $2, $3) RETURING *`,
            [crearGasto.nombre, crearGasto.id_categoria, crearGasto.descripcion, crearGasto.monto, crearGasto.fecha]
    );
    return rows[0]!;
}

export async function actualizar(actualizarGastos: ActualizarGastoDTO, id_gasto: number): Promise <Gasto> {
    const { rows } = await pool.query <Gasto> (
        `UPDATE gasto 
        SET nombre = COALEASCE($1, nombre),
            monto = COALESCE($2, monto),
            descripcion = COALEASCE($3, descripcion),
            fecha = COALESCE($4, fecha)
        WHERE id_gasto = $5`,
        [
            actualizarGastos.nombre, 
            actualizarGastos.monto, 
            actualizarGastos.descripcion,
            actualizarGastos.fecha 
        ]
    );
    return rows[0]!;
}