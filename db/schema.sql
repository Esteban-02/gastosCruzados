-- ======================================================
-- ======================================================

-- Base de datos: Organizacion gastos
-- Autor: Esteban
-- Fecha: 2026-09-23

-- ======================================================
-- ======================================================

-- ======================================================
-- ======================================================

-- para poder recrear todo desde cero
DROP TABLE IF EXISTS aportes_meta, gastos, ingresos, metas, categorias CASCADE;

-- ======================================================
-- ======================================================

-- =========================================================
-- TABLA: CATEGORIAS
-- =========================================================
CREATE TABLE categorias (
    id_categoria    SERIAL          PRIMARY KEY,
    nombre          VARCHAR(50)     NOT NULL,
    tipo            VARCHAR(10)     NOT NULL,

    creado_en       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_categoria_tipo
        CHECK (tipo IN ('ingreso', 'gasto'))
);


-- =========================================================
-- TABLA: METAS
-- =========================================================
CREATE TABLE metas (
    id_meta         SERIAL          PRIMARY KEY,
    nombre          VARCHAR(100)    NOT NULL,
    tipo            VARCHAR(10)     NOT NULL,
    monto_objetivo  NUMERIC(14,2)   NOT NULL,
    estado          VARCHAR(15)     NOT NULL DEFAULT 'proceso',
    fecha_limite    DATE            NOT NULL,

    creado_en       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_meta_tipo
        CHECK (tipo IN ('ahorro', 'compra', 'inversion')),

    CONSTRAINT chk_meta_estado
        CHECK (estado IN ('proceso', 'finalizado', 'cancelada')),

    CONSTRAINT chk_meta_monto
        CHECK (monto_objetivo > 0)
);


-- =========================================================
-- TABLA: INGRESOS
-- =========================================================
CREATE TABLE ingresos (
    id_ingreso      SERIAL          PRIMARY KEY,
    id_categoria    INTEGER         NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    monto           NUMERIC(14,2)   NOT NULL,
    fecha           DATE            NOT NULL DEFAULT CURRENT_DATE,
    descripcion     VARCHAR(255),
    creado_en       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ingreso_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categorias (id_categoria)
        ON DELETE RESTRICT,

    CONSTRAINT chk_ingreso_monto
        CHECK (monto > 0)
);


-- =========================================================
-- TABLA: GASTOS
-- =========================================================
CREATE TABLE gastos (
    id_gasto        SERIAL          PRIMARY KEY,
    id_categoria    INTEGER         NOT NULL,
    nombre          VARCHAR(100)    NOT NULL,
    monto           NUMERIC(14,2)   NOT NULL,
    fecha           DATE            NOT NULL DEFAULT CURRENT_DATE,
    descripcion     VARCHAR(255),
    creado_en       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_gasto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categorias (id_categoria)
        ON DELETE RESTRICT,

    CONSTRAINT chk_gasto_monto
        CHECK (monto > 0)
);


-- =========================================================
-- TABLA: APORTES_META
-- =========================================================
CREATE TABLE aportes_meta (
    id_aporte       SERIAL          PRIMARY KEY,
    id_meta         INTEGER         NOT NULL,
    monto           NUMERIC(14,2)   NOT NULL,
    fecha           DATE            NOT NULL DEFAULT CURRENT_DATE,
    descripcion     VARCHAR(255),
    creado_en       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_aporte_meta
        FOREIGN KEY (id_meta)
        REFERENCES metas (id_meta)
        ON DELETE RESTRICT,

    CONSTRAINT chk_aporte_monto
        CHECK (monto > 0)
);


-- =========================================================
-- ÍNDICES
-- =========================================================
CREATE INDEX idx_gastos_categoria   ON gastos (id_categoria);
CREATE INDEX idx_gastos_fecha       ON gastos (fecha);
CREATE INDEX idx_ingresos_categoria ON ingresos (id_categoria);
CREATE INDEX idx_ingresos_fecha     ON ingresos (fecha);
CREATE INDEX idx_aportes_meta       ON aportes_meta (id_meta);