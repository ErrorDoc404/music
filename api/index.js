const { static, Router } = require("express");
const api = Router();
const fs = require("fs");
const { join } = require("path");
const config = require("../config");

const RoutesPath = join(__dirname, "Routes");

fs.readdir(RoutesPath, (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    api.use("/api/" + file.split(".")[0], require(RoutesPath + "/" + file));
  });
});

api.use("/", static(join(__dirname, "..", "assets")));

//Handle Login and other stuff

const session = require("express-session");
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(
  new DiscordStrategy(
    {
      clientID: config.ClientID,
      clientSecret: config.ClientSecret,
      callbackURL: config.CallbackURL,
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, done) {
      //User logged in yay!
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

api.use(
  session({
    secret: config.CookieSecret,
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
  })
);

api.use(passport.initialize());
api.use(passport.session());

api.get(
  config.CallbackURL,
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

api.use("/", require("./routes"));
api.use("/api", require("./Middlewares"));

module.exports = api;
