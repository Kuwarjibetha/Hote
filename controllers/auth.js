const User = require("../models/user");

//  Render Signup Page 
module.exports.renderSignup = (req, res) => {
  res.render("auth/signup");
};

//  Handle Signup Form Submit 
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    //  Prevent anyone from self-assigning admin role
    const safeRole = role === "admin" ? "guest" : (role || "guest");

    const user = new User({ username, email, role: safeRole });

    // register() hashes password automatically — no bcrypt needed!
    const registeredUser = await User.register(user, password);

    // Auto login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome to Wanderlust, ${username}! 🏠`);
      res.redirect("/listings");
    });

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//  Render Login Page 
module.exports.renderLogin = (req, res) => {
  res.render("auth/login");
};

//  Handle Login Form Submit 
module.exports.login = (req, res) => {
  req.flash("success", `Welcome back, ${req.user.username}! 👋`);

  // Send user to page they originally wanted to visit
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//  Handle Logout 
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully. See you soon! 👋");
    res.redirect("/listings");
  });
};