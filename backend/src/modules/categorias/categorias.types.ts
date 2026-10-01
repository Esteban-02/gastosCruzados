

export interface Categoria {
    id_categoria: number,
    nombre: string,
    tipo: string,
    creado_en: Date
}

export interface CrearCategoriaDTO {
    nombre: string,
    tipo: TipoCategoria,
}

export type TipoCategoria = 'ingreso' | 'gasto'; 