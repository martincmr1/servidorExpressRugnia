const { Router } = require("express");
const { protectedRoute } = require("../middlewares/protected-route.middleware");

const router = Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/api/sessions/current", protectedRoute, (req, res) => {
  const user = {
    name:  req.user.first_name,
    lastname:  req.user.last_name,
    email: req.session.user.email,
    role:  req.session.user.role,
  };

  
  return res.render("profile", user);
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    return res.redirect("/mongo");
  });
});

module.exports = router;
