import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// define el esquema de la base de datos

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DB_PASSWORD: z.string().min(1, "La contraseña es requerida"),
    DB_PORT: z.coerce.number().default(5432),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_HOST: z.string().default('localhost'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
})


//Validamos proccess.env contra nuestro esquema

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Error en la configuracion en las variables del entorno");
    console.error(JSON.stringify(parsedEnv.error.format()));
    process.exit(1);
}

export const env = parsedEnv.data;
