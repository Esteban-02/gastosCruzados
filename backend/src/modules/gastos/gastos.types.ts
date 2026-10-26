export interface Gasto {
    id_gasto: number,
    id_categoria: number,
    nombre: string,
    monto: string,
    fecha: Date,
    descripcion: string | null,
    creado_en: Date,
}

export interface CrearGastoDTO {
    id_categoria: number,
    nombre: string,
    monto: string,
    fecha: string,
    descripcion: string,
}

export type ActualizarGastoDTO = Partial <crearGastoDTO>;