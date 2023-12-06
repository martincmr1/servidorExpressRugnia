const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const Users = require("../Dao/models/users.model");
const { getHashedPassword, comparePassword } = require("../utils/password");
const transport = require("../utils/nodemailer.util");
const { UserMail } = require(".");
const Carts = require("../Dao/models/carts.model");
require("dotenv").config();

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, role } = req.body;
        const age = parseInt(req.body.age, 10);

        try {
          const user = await Users.findOne({ email: username });
          if (user) {
            return done(null, false); // Usuario ya existe
          }

           const id = Date.now();
         const products = [];
         const newCart = {  products,id };
          const cart = await Carts.create(newCart);

          const userInfo = {
            first_name,
            last_name,
            email,
            age,
            role,
            password: getHashedPassword(password),
            cart: cart// Usar la ID del carrito creado
          };

          try {
            await transport.sendMail({
              from: UserMail,
              to: userInfo.email,
              subject: `¡Bienvenido, ${userInfo.first_name}!`,
              html: `
                <div>
                  <h1>¡Hola ${userInfo.last_name}! Gracias por registrarte</h1>
                  <img src="cid:gatito" alt="Gatito" />
                </div>
              `,
              attachments: [{
                filename: 'gato.jpg',
                path: process.cwd() + '/images/gato.jpg',
                cid: 'gatito',
              }],
            });
          } catch (error) {
            console.log(error);
          }

          const newUser = await Users.create(userInfo);
          done(null, newUser); // Usuario creado exitosamente
        } catch (error) {
          done(`Error al crear el usuario: ${error}`);
        }
      }
    )
  );
};


  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await Users.findOne({ email: username });
          if (!user) {
            console.log("El usuario no existe");
      
            return done(null, false);
          }

          if (!comparePassword(password, user.password)) {
            console.log("Contraseña incorrecta");

            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await Users.findOne({ email: profile._json.email });
          if (!user) {
            const userInfo = {
              name: profile._json.name,
              lastname: "",
              email: profile._json.email,
              password: "",
            };
            const newUser = await Users.create(userInfo);
            return done(null, newUser);
          }
        } catch (error) {
          done(null, error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });


module.exports = initializePassport;
