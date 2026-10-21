import type { Categoria } from "../categorias/categorias.types.js";

export interface Gasto {
    id_gasto: number,
    id_categoria: number,
    nombre: string,
    monto: string,
    fecha: Date,
    descripcion: string,
    creado_en: Date,
}

export interface crearGastoDTO {
    id_categoria: number,
    nombre: string,
    monto: string,
    fecha: Date,
    descripcion: string,
}

export type ActualizarGastoDTO = Partial <crearGastoDTO>;