CREATE DATABASE encuesta;

-- -----------------------------------------------------
-- Table `encuesta`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cliente (
  id_cliente SERIAL PRIMARY KEY,
  codigo_sn VARCHAR(255) NOT NULL,
  nombre_sn VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL,
  correo_recepcion VARCHAR(255) NOT NULL,
  telefono_movil BIGINT NOT NULL,
  telefono_1 BIGINT,
  telefono_2 BIGINT,
  estado_encuesta BOOLEAN NOT NULL,
  nombre_grupo VARCHAR(255) NOT NULL,
  codigo_proyecto INT NOT NULL
);

-- -----------------------------------------------------
-- Table `encuesta`.`pregunta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS pregunta (
  id_pregunta SERIAL PRIMARY KEY,
  pregunta VARCHAR(255) NOT NULL
);

-- -----------------------------------------------------
-- Table `encuesta`.`respuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS respuesta (
  id_respuesta SERIAL PRIMARY KEY,
  respuesta VARCHAR(255) NOT NULL,
  pregunta_id_pregunta INT NOT NULL,
  CONSTRAINT fk_respuesta_pregunta
    FOREIGN KEY (pregunta_id_pregunta)
    REFERENCES pregunta (id_pregunta)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table `encuesta`.`encuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS encuesta (
  id_encuesta SERIAL PRIMARY KEY,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  pregunta_1 VARCHAR(255) NOT NULL,
  pregunta_2 VARCHAR(255) NOT NULL,
  pregunta_3 VARCHAR(255) NOT NULL,
  pregunta_4 VARCHAR(255) NOT NULL,
  comentario VARCHAR(255) NOT NULL,
  encuestador VARCHAR(255) NOT NULL,
  id_cliente INT REFERENCES cliente(id_cliente)
);


