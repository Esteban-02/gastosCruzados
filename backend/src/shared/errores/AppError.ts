export class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
        public readonly codigo ?: string,
    ){
        super(message);
        this.name = 'AppError'
    }
}

export class NotFoundError extends AppError {
    constructor (
        recurso: string
    ){
        super(`${recurso} No encontrado`, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message: string){
        super(message, 409);
    }
}