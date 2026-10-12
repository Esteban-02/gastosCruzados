import express from 'express';
import pool from './config/database.js';
import categoriasRouters from './modules/categorias/categorias.routes.js'

const app = express();

//midedlewares

app.use(express.json());

// ROUTERS CONTROLADOR
app.get('/api/categorias/', categoriasRouters);

// Ruta para obtener el estado de salud del servidor

app.get('/health', async (req, res) => {
    try{
        const resultado = await pool.query("SELECT NOW()");
        res.status(200).json({
            status: 'ok',
            databaseTime: resultado.rows[0].now,
        })
    }catch(error){
        console.log("Error en la conexion a la base de datos: ", error);
        res.status(500).json({
            status: 'Error',
            mensaje: 'Error en la conexion de la base de datos',
        });
    }
});

export default app;


