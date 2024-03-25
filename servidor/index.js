const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const passport = require("passport");
const cookieSession = require("cookie-session")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

import { Transporter } from "../config/mailer";



const port = process.env.PORT || 5000;


// Adding required middlewares
app.use(cookieSession({
  name: 'authSession',
  keys: ["askduhakdnkbiygvhbad7a6s*&^*S^D8asdbk"],
  maxAge: 24 * 60 * 60 * 100
}))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://example.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
// CORS - Cross Origin Resource Sharing, our Frontend will be runing on different port (3000) and our Backend will run of 5000, it so how can frontend access backend, so we need to connect it, thats the reason we are using CORS.
app.use(express.json());
app.use(cors()); //req.body
// app.use(cors({
//   origin: "http://localhost:3000",  //only localhost:3000 can access this server
//   credentials: true  //Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
// }))


app.use(passport.initialize())
app.use(passport.session());

//Adding Route, "/auth" is going to be perfix for all the routes which are in ./router/auth/passport
app.use('/auth', require('./Routers/auth/passport'));



// ENVIA CORREO

app.get("/enviar/correo", async (req, res) => {
  try {
    await Transporter.sendMail({
      from: " forgot password <jefedesarrollo@commerk.com.co>",
      to: "santiagobernalbetancourth@gmail.com",
      subject: "Forgot Password",
      html: "<h1>Forgot Password</h1>"
    });
    // const allTodos = await pool.query("SELECT * FROM usuario");
  } catch (err) {
    console.error(err.message);
  }
});

//Agregar cliente
app.post("/cliente/nuevo", async (req, res) => {
  console.log("encuesta req.body", req.body);
  //console.log("encuesta req.body.encuesta", req.body.encuesta);
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
    } = req.body.data;
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

//Borrar clientes
app.delete(`/cliente/borrar/todos`, async (req, res) => {
  try {
    await pool.query("DELETE FROM cliente");
    res.json("clientes eliminados en total");
  } catch (err) {
    console.log(err.message);
  }
});


//Borrar clientes
app.delete(`/cliente/eliminar`, async (req, res) => {
  try {
    const { id_cliente } = req.body;
    console.log("cliente/eliminar req.body", req.body);
    await pool.query("DELETE FROM cliente WHERE id_cliente = $1",
      [id_cliente]);
    res.json("cliente eliminado");
  } catch (err) {
    console.log(err.message);
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

//Lista clientes Antioquia 
app.get("/cliente/lista/antioquia", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 2");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes Valle 
app.get("/cliente/lista/valle", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 1");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes Antioquia falso
app.get("/cliente/lista/antioquiaFalso", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 2 AND estado_encuesta = false");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes Valle falso
app.get("/cliente/lista/valleFalso", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 1 AND estado_encuesta = false");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes Antioquia verdadero
app.get("/cliente/lista/antioquiaVerdadero", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 2 AND estado_encuesta = true");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista clientes Valle verdadero
app.get("/cliente/lista/valleVerdadero", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM cliente WHERE codigo_proyecto = 1 AND estado_encuesta = true");
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



//Agregar encuesta
app.post("/encuesta", async (req, res) => {
  console.log("encuesta req.body", req.body);
  console.log("encuesta req.body.encuesta", req.body.data);
  try {
    const {
      pregunta_1,
      pregunta_2,
      pregunta_3,
      pregunta_4,
      comentario,
      encuestador,
      id_cliente
    } = req.body.data;
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
    console.log("newTodo.rows[0]", newTodo.rows[0]);
    if (newTodo.rows[0].id_cliente) {
      try {
        const { id_cliente } = req.body.data;
        console.log(" req.body update", req.body.data);
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

//Lista encuestas 
app.get("/encuesta/lista", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM encuesta");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista resultados
app.get("/encuesta/resultados", async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT 
    cliente.id_cliente,
    cliente.nombre_sn,
    cliente.codigo_sn,
    cliente.nombre_grupo,
    encuesta.pregunta_1,
    encuesta.pregunta_2,
    encuesta.pregunta_3,
    encuesta.pregunta_4, 
    encuesta.encuestador,
    encuesta.comentario,
    encuesta.fecha_creacion
    FROM cliente
    JOIN encuesta ON cliente.id_cliente = encuesta.id_cliente`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//Borrar encuestas
app.delete(`/encuesta/eliminar`, async (req, res) => {
  try {
    const { id_encuesta } = req.body;
    console.log("encuesta/eliminar req.body", req.body);
    await pool.query("DELETE FROM encuesta WHERE id_encuesta = $1",
      [id_encuesta]);
    res.json("cliente eliminado");
  } catch (err) {
    console.log(err.message);
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
      telefono_usuario,
      documento_usuario,
      estado_usuario,
      tipo_usuario_id_tipo_usuario,
      proyecto_id_proyecto,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    //console.log("hashedPassword",hashedPassword);
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuario (password, nombre_usuario, apellidos_usuario, googleid, useremail, userimg, username, telefono_usuario, documento_usuario, estado_usuario, tipo_usuario_id_tipo_usuario, proyecto_id_proyecto ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        `${hashedPassword}`,
        `${nombre_usuario}`,
        `${apellidos_usuario}`,
        `${googleid}`,
        `${useremail}`,
        `${userimg}`,
        `${username}`,
        `${telefono_usuario}`,
        `${documento_usuario}`,
        `${estado_usuario}`,
        `${tipo_usuario_id_tipo_usuario}`,
        `${proyecto_id_proyecto}`,
      ],
    );
    res.json(nuevoUsuario.rows[0]);
    console.error(nuevoUsuario.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Lista usuarios 
app.get("/usuarios/lista", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM usuario");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});



app.post("/login", async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const users = await pool.query('SELECT * FROM usuario WHERE useremail = $1', [useremail]);
    if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });
    //PASSWORD CHECK
    console.log(" users.rows[0]", users.rows[0]);
    const match = await bcrypt.compare(password, users.rows[0].password);
    if (match) {
      //create a jwt token
      const serviceToken = jwt.sign(
        {
          idUsuario: users.rows[0].id_usuario,
          nombreUsuario: users.rows[0].nombre_usuario,
          apellidosUsuario: users.rows[0].apellidos_usuario,
          useremail: users.rows[0].useremail,
          userimg: users.rows[0].userimg,
          username: users.rows[0].username,
          telefonoUsuario: users.rows[0].telefono_usuario,
          documentoUsuario: users.rows[0].documento_usuario,
          estadoUsuario: users.rows[0].estado_usuario,
          tipoUsuarioIdTipoUsuario: users.rows[0].tipo_usuario_id_tipo_usuario,
          proyectoIdProyecto: users.rows[0].proyecto_id_proyecto
        }
        , 'my_secret_key', { expiresIn: '12h' });
      // console.log("serviceToken", serviceToken);
      // res.json(serviceToken )
      res.json({ serviceToken, user: users.rows[0] })
    } else {
      res.status(401).json({ message: 'Invalid Password' })
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }

});


//Authentication Middleware using JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const extractedToken = token.split(' ')[1];
  try {
    const decoded = jwt.verify(extractedToken, 'my_secret_key')
    req.user = decoded;
    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
  }
}

app.get('/profile', authenticate, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//ROUTES//

app.get('/', (req, res) => {
  res.json("hello backend");
})



app.listen(port, () => {
  console.log("server has started on port", port);
});