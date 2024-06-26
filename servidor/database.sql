CREATE DATABASE encuesta;
-- -----------------------------------------------------
-- Table `encuesta`.`usuario`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  password VARCHAR(255),
  nombre_usuario VARCHAR(45) NOT NULL,
  apellidos_usuario VARCHAR(45) NOT NULL,
  googleid VARCHAR(255),
  useremail VARCHAR(255),
  userimg VARCHAR(255),
  username VARCHAR(255),
  telefono_usuario INT NOT NULL,
  documento_usuario INT NOT NULL,
  estado_usuario BOOLEAN NOT NULL,
  tipo_usuario_id_tipo_usuario INT NOT NULL,
  proyecto_id_proyecto INT NOT NULL
);
-- -----------------------------------------------------
-- Table `encuesta`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cliente (
  id_cliente SERIAL PRIMARY KEY,
  codigo_sn VARCHAR(255) NOT NULL,
  nombre_sn VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255),
  correo_recepcion VARCHAR(255),
  telefono_movil VARCHAR(255),
  telefono_1 VARCHAR(255),
  telefono_2 VARCHAR(255),
  estado_encuesta BOOLEAN NOT NULL,
  estado_respuesta VARCHAR(255) DEFAULT 'pendiente',
  nombre_grupo VARCHAR(255) NOT NULL,
  codigo_proyecto INT NOT NULL
);

CREATE TABLE IF NOT EXISTS cliente_email (
  id_cliente SERIAL PRIMARY KEY,
  codigo_sn VARCHAR(255) NOT NULL,
  nombre_sn VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255),
  estado_email BOOLEAN NOT NULL DEFAULT FALSE;
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



SELECT 
cliente.id_cliente,
cliente.nombre_sn,
cliente.codigo_sn
cliente.nombre_grupo,
encuesta.pregunta_1,
encuesta.pregunta_2,
encuesta.pregunta_3,
encuesta.pregunta_4, 
encuesta.encuestador,
encuesta.comentario,
encuesta.fecha_creacion
FROM cliente
JOIN encuesta ON cliente.id_cliente = encuesta.id_cliente;
