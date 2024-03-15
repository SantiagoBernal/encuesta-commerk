//Importing all required packages
const router = require("express").Router()
const googleStrategy = require("passport-google-oauth20").Strategy
const passport = require("passport")
const jwt = require("jsonwebtoken")
const pool = require("../../db");


//serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
  done(null, user);
})

//deserialize are used to set id as a cookie in the user's browser and to get the id from the cookie when it then used to get user info in a callback.
passport.deserializeUser((user, done) => {
  done(null, user);
})


//Configuring google's strategy 
passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENTID,  //passing CLIENT ID
      clientSecret: process.env.CLIENTSECRET, //Passing CLIENT SECRET, You can get this form https://console.cloud.google.com/, to know more go on line 113 of this file.
      callbackURL: "/auth/google/callback",  //This means after signin on what route google should redirect
    },
    (req, accessToken, refreshToken, profile, cb) => {
      //console.log("profile inicial",profile)
      //console.log("profile.id",profile.id)
      // console.log("cb",cb)
      //console.log("req",req)
      //After successful signin, we have access of these thing which are in parameters
      // we are checking wehther the user is already added to our database or not, if already exist we can directly give a callback age we can redirect the user to any page we are redirecting it on home page, this functionality is not written in this function, you can check line no. 72.
      pool.query(
        `SELECT * FROM usuario WHERE googleid = '${profile.id}';`,
        (err, user) => {
          //console.log("user query",user)
          //console.log("user query",user.rows[0])
          //console.log("user query.length",user.rows.length)
          // console.log("err query",err)
          if (!err && user.rows.length != 0) {  // checking whether user exist or not
            //console.log("adentro user",user)
            return cb(null, user);
          } else {
            // if user dosen't exist, we are adding the user to database
            pool.query(
              'INSERT INTO usuario (nombre_usuario, apellidos_usuario, googleid, useremail, userimg, username, disponibilidad_usuario, telefono_usuario, documento_usuario, tipo_usuario_id_tipo_usuario, estado_id_estado ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
              [
                `${profile.displayName}`,
                `${profile.displayName}`,
                `${profile.id}`,
                `${profile.emails[0].value}`,
                `${profile.photos[0].value}`,
                `${profile.displayName}`,
                false,
                parseInt(3142870770),
                parseInt(14569330),
                1,
                1
              ],
              (err, userAdded) => {
                console.log("userAdded", userAdded)
                if (err) {
                  return cb(err, false);
                  console.log("err dectected")
                } else {
                  pool.query(
                    `SELECT * FROM usuario  WHERE googleid = '${profile.id}';`,
                    (err, user) => {
                      return cb(null, user);
                      console.log("Login/Sign in successfully");
                    });
                }
              }
            );
          }
        }
      );
    }
  )
);


// Passing google authenticate method as a middleware
router.get('/google', passport.authenticate('google', {
  scope: ['profile', "email"]
}));

// after signin the google will redirect to this route as we have added this route in callbace URL on line no 26
router.get("/google/callback", passport.authenticate("google",), (req, res) => {
  //If user exist than ...
  if (req.user) {
     //console.log("req", req);
     console.log("req.user /google/callback", req.user.rows[0]);
    // console.log("the use is [0]", req.user[0]); //Just for debugging
    //console.log("the user /google/callback", req.user.rows[0]);
    //Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have atleast length of 20, i have just passed 'rahulnikam' but you should not do the same and this should be kept in environment variable so that no one can see it
    const googleAuthToken = jwt.sign({ googleAuthToken: req.user.rows[0].googleid }, "SantiAGo", { expiresIn: 864000000 })
    //res.cookie will set a cookie in user's header (i mean in users http header😂)
    // we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
    res.cookie("googleAuthToken", googleAuthToken, { expires: new Date(Date.now() + 86400 * 1000), httpOnly: true })
    // we are now redirecting the user to localhost:3000 which is our frontend
    res.redirect("http://localhost:5173")
  }
});

// we are making a request fron frontend to localhost:5000/auth/login/success, and we are sending user data (remember that don't pass any confidential data line user password or any other)
router.get("/login/success", (req, res) => {
  if (req.user) {
    //console.log("req.user.rows[0] /login/success",req.user.rows[0])
    //console.log("req.user.rows[0]",req.user.rows[0])
    console.log("req.user /login/success",req.user)
    res.status(200).json({
      success: true,
      message: "successfull",
      user: [req.user.rows[0].username, req.user.rows[0].useremail, req.user.rows[0].userimg]
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({
    logout: req.user
  })
});

module.exports = router



/*
   1. Go to https://console.cloud.google.com/
   2. Create a new project by any name
   3. go to OAuth consent screen and add required information like (App Name & Email)
   4. now go to credential tab and click create credential and then click on OAuth client ID.
   5. Select application type as web application.
   6. after that let name field remains as it is or you can change it... depends on you but the main thing is you should add Authorized JavaScript origins as address of your frontend otherwise it will give you an error.
   7. Authorized redirect URIs should be URIs1 should be address of frontend in our case its localhost:3000 and URIs2 should be address of server with the route on which google should redirect in our case its http:localhost:5000/auth/google/callback
   8.  click on save and it will ask few mor things you can skip those and at the end you will get CLIENT ID & CLIENT SECRET and thats what we have added on line no 24 and 25.
*/
