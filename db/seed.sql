-- =========================================================
-- seed.sql
-- Datos de prueba para la base de datos de finanzas personales
-- =========================================================

-- =========================================================
-- 8 CATEGORÍAS
-- =========================================================

INSERT INTO categorias (nombre, tipo) VALUES
    ('Salario', 'ingreso'),
    ('Freelance', 'ingreso'),
    ('Otros ingresos', 'ingreso'),
    ('Mercado', 'gasto'),
    ('Transporte', 'gasto'),
    ('Servicios', 'gasto'),
    ('Entretenimiento', 'gasto'),
    ('Salud', 'gasto');


-- =========================================================
-- 2 METAS
-- Fechas límite distintas
-- =========================================================

INSERT INTO metas (
    nombre,
    tipo,
    monto_objetivo,
    estado,
    fecha_limite
) VALUES
    (
        'Fondo de emergencia',
        'ahorro',
        6000000.00,
        'proceso',
        '2027-03-31'
    ),
    (
        'Comprar computador portátil',
        'compra',
        4500000.00,
        'proceso',
        '2027-06-30'
    );


-- =========================================================
-- 3 INGRESOS
-- Distribuidos en meses diferentes
-- =========================================================

INSERT INTO ingresos (
    id_categoria,
    nombre,
    monto,
    fecha,
    descripcion
) VALUES
    (
        1,
        'Salario junio',
        3500000.00,
        '2026-06-30',
        'Pago de salario correspondiente a junio'
    ),
    (
        1,
        'Salario julio',
        3500000.00,
        '2026-07-31',
        'Pago de salario correspondiente a julio'
    ),
    (
        2,
        'Proyecto freelance agosto',
        850000.00,
        '2026-08-20',
        'Desarrollo de proyecto freelance'
    );


-- =========================================================
-- 15 GASTOS
-- 5 gastos en junio
-- 5 gastos en julio
-- 5 gastos en agosto
-- =========================================================

INSERT INTO gastos (
    id_categoria,
    nombre,
    monto,
    fecha,
    descripcion
) VALUES

    -- -----------------------------------------------------
    -- JUNIO 2026
    -- -----------------------------------------------------
    (
        4,
        'Mercado del mes',
        420000.00,
        '2026-06-05',
        'Compra de alimentos y productos para el hogar'
    ),
    (
        5,
        'Transporte',
        120000.00,
        '2026-06-08',
        'Transporte y desplazamientos'
    ),
    (
        6,
        'Servicio de internet',
        95000.00,
        '2026-06-12',
        'Pago mensual de internet'
    ),
    (
        7,
        'Salida con amigos',
        85000.00,
        '2026-06-20',
        'Comida y entretenimiento'
    ),
    (
        8,
        'Medicamentos',
        70000.00,
        '2026-06-25',
        'Compra de medicamentos'
    ),

    -- -----------------------------------------------------
    -- JULIO 2026
    -- -----------------------------------------------------
    (
        4,
        'Mercado del mes',
        465000.00,
        '2026-07-04',
        'Compra de alimentos y productos para el hogar'
    ),
    (
        5,
        'Transporte',
        135000.00,
        '2026-07-09',
        'Transporte y desplazamientos'
    ),
    (
        6,
        'Servicios públicos',
        180000.00,
        '2026-07-15',
        'Pago de servicios públicos'
    ),
    (
        7,
        'Cine y comida',
        95000.00,
        '2026-07-22',
        'Actividad de entretenimiento'
    ),
    (
        8,
        'Consulta médica',
        120000.00,
        '2026-07-28',
        'Consulta médica'
    ),

    -- -----------------------------------------------------
    -- AGOSTO 2026
    -- -----------------------------------------------------
    (
        4,
        'Mercado del mes',
        440000.00,
        '2026-08-03',
        'Compra de alimentos y productos para el hogar'
    ),
    (
        5,
        'Transporte',
        110000.00,
        '2026-08-07',
        'Transporte y desplazamientos'
    ),
    (
        6,
        'Servicio de internet',
        95000.00,
        '2026-08-12',
        'Pago mensual de internet'
    ),
    (
        7,
        'Suscripción y entretenimiento',
        65000.00,
        '2026-08-18',
        'Suscripciones y entretenimiento'
    ),
    (
        4,
        'Compra adicional de alimentos',
        175000.00,
        '2026-08-26',
        'Compra adicional para el hogar'
    );


-- =========================================================
-- 5 APORTES A LAS METAS
-- =========================================================

INSERT INTO aportes_meta (
    id_meta,
    monto,
    fecha,
    descripcion
) VALUES
    (
        1,
        500000.00,
        '2026-06-30',
        'Primer aporte al fondo de emergencia'
    ),
    (
        1,
        600000.00,
        '2026-07-31',
        'Aporte mensual al fondo de emergencia'
    ),
    (
        1,
        550000.00,
        '2026-08-31',
        'Aporte mensual al fondo de emergencia'
    ),
    (
        2,
        700000.00,
        '2026-07-15',
        'Primer aporte para el computador'
    ),
    (
        2,
        800000.00,
        '2026-08-20',
        'Segundo aporte para el computador'
    );


-- =========================================================
-- CONSULTAS DE VERIFICACIÓN
-- =========================================================

-- Ver categorías
SELECT * FROM categorias ORDER BY id_categoria;

-- Ver metas
SELECT * FROM metas ORDER BY id_meta;

-- Ver ingresos
SELECT * FROM ingresos ORDER BY fecha;

-- Ver gastos
SELECT * FROM gastos ORDER BY fecha;

-- Ver aportes
SELECT * FROM aportes_meta ORDER BY fecha;
