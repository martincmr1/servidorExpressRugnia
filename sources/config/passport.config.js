const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const Users = require("../Dao/models/users.model");
const { getHashedPassword, comparePassword } = require("../utils/password");
const transport = require("../utils/nodemailer.util");
const { UserMail } = require(".");
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
            return done(null, false);
          }
          const userInfo = {
            first_name,
            last_name,
            email,
            age,
            role,
            password: getHashedPassword(password),
          };

          try {
            await transport.sendMail({
              from: UserMail,
              to: userInfo.email,
              subject: `bienvenido, ${userInfo.first_name}`,
              html: `
           <div>
           <h1> hola ${userInfo.last_name} Gracias por registrarte</h1>
           <img src
           </div> `,
              attachments: [
                {
                  filename: "gato.jpg",
                  path: process.cwd() + "/sources/images/gato.jpg",
                  cid: "gatito",
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }

          const newUser = await Users.create(userInfo);

          done(null, newUser);
        } catch (error) {
          done(`error al crear el usuario:${error}`);
        }
      }
    )
  );

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

          // Actualiza last_connection al iniciar sesión
         user.last_connection = new Date();
          await user.save(); // Guarda el cambio en last_connection

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
};

module.exports = initializePassport;
