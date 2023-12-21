require("dotenv").config();
const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const { getHashedPassword, comparePassword } = require("../utils/password");
const transport = require("../utils/nodemailer.util");
const {
  USER_MAIL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require(".");
const UserService = require("../services/users.service");
const CartService = require("../services/carts.service");
const UserDto = require("../DTO/user.dto");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const age = parseInt(req.body.age, 10);
        try {
          const user = await UserService.GET_ONE_USER({ email: username });

          if (user) {
            return done(null, false);
          }

          const id = Date.now();
          const products = [];
          const newCart = { products, id };
          const cart = await CartService.CREATE_CART(newCart);

          const NewUser = new UserDto(req.body);

          const userInfo = {
            first_name: NewUser.first_name,
            last_name: NewUser.last_Name,
            email: NewUser.email,
            age,
            role: NewUser.role,
            password: getHashedPassword(password),
            cart: cart, 
          };

          try {
            await transport.sendMail({
              from: USER_MAIL,
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

          const newUser = await UserService.CREATE_USER(userInfo);

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
          const user = await UserService.GET_ONE_USER({ email: username });

          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }

          if (!comparePassword(password, user.password)) {
            console.log("Contraseña incorrecta");
            return done(null, false);
          }

          user.last_connection = new Date();
          await user.save(); //

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
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await UserService.GET_ONE_USER({
            email: profile._json.email,
          });
          if (!user) {
            const userInfo = {
              name: profile._json.name,
              lastname: "",
              email: profile._json.email,
              password: "",
            };

            const newUser = await UserService.CREATE_USER(userInfo);

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
    const user = await UserService.GET_USER_BY_ID(id);

    done(null, user);
  });
};

module.exports = initializePassport;
