const passport = require("passport");
const local = require("passport-local");
const Users = require("../Dao/models/users.model");
const { getHashedPassword, comparePassword } = require("../utils/password");

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { name, lastname, email } = req.body;
        try {
          const user = await Users.findOne({ email: username });
          if (user) {
            console.log("el usuario ya existe");
            return done(null, false);
          }
          const userInfo = {
            name,
            lastname,
            email,
            password: getHashedPassword(password),
          };
          const newUser = await Users.create(userInfo);
          done(null, newUser);
        } catch (error) {
          done(`error al crear el usuario:${error}`);
        }
      }
    )
  );



  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await Users.findOne({ email: username });
          if (!user) {
            console.log('El usuario no existe');
            return done(null, false);
          }
  
          if (!comparePassword(password, user.password)) {
            console.log('Contraseña incorrecta');
            return done(null, false);
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  

passport.serializeUser((user,done)=>{
  done(null,user._id)
})


passport
.deserializeUser(async(id,done)=>{
  const user = await Users.findById(id)
  done(null,user)
})
    }






module.exports = initializePassport;
