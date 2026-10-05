import {
    listar,
    crear,
    actualizar,
    eliminar,
    buscarPorId,
} from './modules/categorias/categorias.repository.js'

async function prueba() {
    console.log("Listar");
    const listarCategorias = await listar();
    console.log(listarCategorias);


    console.log("-----Crear Categoria-----");
    const crearCategoria = await crear({
        nombre: 'prueba',
        tipo: 'gasto'
    });
    console.log("Crear Categoria: ", crearCategoria);


    console.log("-----Buscar por id-----");
    const buscar = await buscarPorId(1);
    console.log("Resultado de la busqueda: ", buscar);


    console.log("-----Actualizar -----");
    const actualizarCategoria = await actualizar(
        {
            nombre: 'Salario1',
            tipo: 'gasto',
        },
        10,
    );
    console.log("Actualizacion Categoria: ", actualizarCategoria);


    console.log("-----Eliminar Categoria-----");
    const eliminarCategoria = await eliminar(10);
    console.log("Resultado eliminar Categoria: ", eliminarCategoria);
    
};


prueba().
    catch(error => {
        console.log("Error en las pruebas", error);
    }).finally(() => {
        process.exit(0);
    });