export class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly codigo?: string,
    ) {
        super(message);
        this.name = 'AppError'
    }
}

export class NotFoundError extends AppError {
    constructor(
        recurso: string
    ) {
        super(`${recurso} No encontrado`, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}

/**
 * Manejo de errores de la base de datos
 * @param error 
 * @returns 
 */
export function esErrorPostgres(error: unknown): error is { code: string } {
    return typeof error === 'object'
        && error !== null
        && 'code' in error;
}