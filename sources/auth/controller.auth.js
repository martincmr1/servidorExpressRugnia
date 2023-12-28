const { Router } = require("express");

const passport = require("passport");
const winstonlogger = require("../utils/winston/logger.winston");

const transport = require("../utils/nodemailer.util");
const { USER_MAIL } = require("../config");
const { getHashedPassword, comparePassword } = require("../utils/password");
const UserService = require("../services/users.service");
const { authToken } = require("../utils/jwt.util");
const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    try {
      res.status(201).json({ status: "success", payload: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "Internal server error" });
    }
  }
);

router.get("/failregister", (req, res) => {
  res.json({ status: "error", error: "Fail register" });
});

router.get("/faillogin", (req, res) => {
  res.json({ status: "error", error: "Fail login" });
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    try {
      if (!req.user)
        return res
          .status(400)
          .json({ status: "error", error: "invalid credentials" });
      req.session.user = {
        email: req.user.email,
        role: "user",
      };

      res
        .status(200)
        .json({ status: "success", payload: "Nueva sesión iniciada" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", error: "internal server error" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;

    res.redirect("/mongo");
  }
);

router.get("/recovery/", (req, res) => {
  res.render("recovery");
});

router.post("/recoverypassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserService.GET_ONE_USER({ email: email });

    if (!user) {
      console.log("El email no está registrado");
      res.status(404).json({ error: "El email no está registrado" });
    } else {
      const currentDate = new Date().getTime();
      try {
        await transport.sendMail({
          from: USER_MAIL,
          to: user.email,
          subject: `Mi Tiend@,hola ${user.first_name}`,
          html: `
          <div>
            <h1>Hola ${user.first_name},</h1>
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="http://localhost:3000/auth/recoverytimelink/${currentDate}">Restablecer Contraseña</a>
          </div>
        `,
        });

        console.log(`Correo electrónico enviado a ${user.email}`);
      } catch (error) {
        console.log(error);
      }

      res
        .status(200)
        .json({ success: "Solicitud de recuperación enviada exitosamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/recoverytimelink/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const linkExpirationTime = 60 * 60 * 1000;

  const currentDate = new Date().getTime();
  const linkTimestamp = parseInt(timestamp);

  if (currentDate - linkTimestamp < linkExpirationTime) {
    res.render("changepassword");
  } else {
    res.render("recovery");
  }
});

router.post("/newpass", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.GET_ONE_USER({ email });

    if (!user) {
      console.log("El usuario no existe");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.password = getHashedPassword(password);
    await user.save();

    return res
      .status(200)
      .json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
