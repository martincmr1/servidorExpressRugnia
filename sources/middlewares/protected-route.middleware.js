


const protectedRoute = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");

  next();
};

const protectedRouteProducts = (req, res, next) => {
  next();
};

module.exports = { protectedRoute, protectedRouteProducts };
