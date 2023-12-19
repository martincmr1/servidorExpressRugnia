const { Router } = require("express");
//const Users = require("../Dao/models/users.model");
const UsersService = require('../services/users.service')

const router = Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/api/sessions/current", (req, res) => {
  const user = {
    name: req.user.first_name,
    lastname: req.user.last_name,
    email: req.session.user.email,
    role: req.user.role,

    
  };
  
  

  return res.render("profile", user,);
});

router.get("/logout", async (req, res) => {
  const userId = req.user._id;

  try {

   const user = await UsersService.UPDATE_USER(userId, {
       last_connection: new Date(),
      })
  // const user = await Users.findByIdAndUpdate(userId, {
 ////    last_connection: new Date(),
 //  });

    if (!user) {
      console.error(
        "Usuario no encontrado al actualizar last_connection al cerrar sesión"
      );
    } else {
      console.log(
        `Última conexión actualizada al cerrar sesión para ${user.email}`
      );
    }
  } catch (error) {
    console.error(
      "Error al actualizar last_connection al cerrar sesión:",
      error
    );
  }

  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    return res.redirect("/mongo");
  });
});




module.exports = router;


