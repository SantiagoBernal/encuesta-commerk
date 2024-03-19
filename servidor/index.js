const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const passport = require("passport");
const cookieSession = require("cookie-session")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;



const port = process.env.PORT || 5000;


// Adding required middlewares
app.use(cookieSession({
  name: 'authSession',
  keys: ["askduhakdnkbiygvhbad7a6s*&^*S^D8asdbk"],
  maxAge: 24 * 60 * 60 * 100
}))

// CORS - Cross Origin Resource Sharing, our Frontend will be runing on different port (3000) and our Backend will run of 5000, it so how can frontend access backend, so we need to connect it, thats the reason we are using CORS.
app.use(express.json());
// app.use(cors()); //req.body
app.use(cors({
  origin: "http://localhost:3000",  //only localhost:3000 can access this server
  credentials: true  //Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
}))


app.use(passport.initialize())
app.use(passport.session());

//Adding Route, "/auth" is going to be perfix for all the routes which are in ./router/auth/passport
app.use('/auth', require('./Routers/auth/passport'));


//Agregar cliente
app.post("/cliente/nuevo", async (req, res) => {
  try {
    const {
      codigo_sn,
      nombre_sn,
      correo_electronico,
      correo_recepcion,
      telefono_movil,
      telefono_1,
      telefono_2,
      estado_encuesta,
      nombre_grupo,
      codigo_proyecto
    } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO cliente (codigo_sn, nombre_sn, correo_electronico, correo_recepcion, telefono_movil, telefono_1, telefono_2, estado_encuesta, nombre_grupo, codigo_proyecto ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [
        codigo_sn,
        nombre_sn,
        correo_electronico,
        correo_recepcion,
        telefono_movil,
        telefono_1,
        telefono_2,
        estado_encuesta,
        nombre_grupo,
        codigo_proyecto
      ],
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes 
app.get("/cliente/lista", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes false
app.get("/cliente/listaF", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE estado_encuesta = false");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes true
app.get("/cliente/listaV", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE estado_encuesta = true");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Editar cliente
app.put("/cliente/editar", async (req, res) => {
  try {
    const { tipo_usuario } = req.body;
    const { id_tipo_usuario } = req.body;
    if (!tipo_usuario) {
      return res.status(400).send('provide a field (tipo_usuario)');
    }
    const query = `
      UPDATE tipo_usuario
      SET tipo_usuario = COALESCE($1, tipo_usuario)
      WHERE id_tipo_usuario = ${id_tipo_usuario};
    `;
    const allTodos = await pool.query(query, [tipo_usuario]);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Some error has occured failed');
  }
});

//Eliminar cliente
app.delete(`/cliente/eliminar`, async (req, res) => {
  try {
    const { id_tipo_usuario } = req.body;
    await pool.query("DELETE FROM tipo_usuario WHERE id_tipo_usuario = $1",
      [id_tipo_usuario]);
    res.json("Tipo de usuario eliminado");
  } catch (err) {
    console.log(err.message);
  }
});


//Agregar encuesta
app.post("/encuesta", async (req, res) => {
  console.log("encuesta req.body", req.body);
  try {
    const {
      pregunta_1,
      pregunta_2,
      pregunta_3,
      pregunta_4,
      comentario,
      encuestador,
      id_cliente
    } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO encuesta (pregunta_1, pregunta_2, pregunta_3, pregunta_4, comentario, encuestador, id_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        pregunta_1,
        pregunta_2,
        pregunta_3,
        pregunta_4,
        comentario,
        encuestador,
        id_cliente
      ],
    );
    if (newTodo.rows[0].id_cliente) {
      try {
        const { id_cliente } = req.body;
        const query = `
          UPDATE cliente
          SET estado_encuesta = true
          WHERE id_cliente = ${id_cliente};
        `;
        const allEstado = await pool.query(query);
        res.json(allEstado.rows);
      } catch (err) {
        console.error(err);
        res.status(500).send('Some error has occured failed');
      }
    }
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



app.get('/ping', async (req, res) => {
 const result = await pool.query('SELECT NOW()');
  return res.json(result.rows[0]);
})















//get all users

app.post("/register", async (req, res) => {
  try {
    const {
      password,
      nombre_usuario,
      apellidos_usuario,
      googleid,
      useremail,
      userimg,
      username,
      disponibilidad_usuario,
      telefono_usuario,
      documento_usuario,
      tipo_usuario_id_tipo_usuario,
      estado_id_estado,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    //console.log("hashedPassword",hashedPassword);
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuario (password, nombre_usuario, apellidos_usuario, googleid, useremail, userimg, username, disponibilidad_usuario, telefono_usuario, documento_usuario, tipo_usuario_id_tipo_usuario, estado_id_estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        `${hashedPassword}`,
        `${nombre_usuario}`,
        `${apellidos_usuario}`,
        `${googleid}`,
        `${useremail}`,
        `${userimg}`,
        `${username}`,
        `${disponibilidad_usuario}`,
        `${telefono_usuario}`,
        `${documento_usuario}`,
        `${tipo_usuario_id_tipo_usuario}`,
        `${estado_id_estado}`,
      ],
    );
    res.json(nuevoUsuario.rows[0]);
    console.error(nuevoUsuario.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});



//ROUTES//

app.get('/', (req, res) => {
  res.json("hello backend");
})



app.listen(port, () => {
  console.log("server has started on port", port);
});