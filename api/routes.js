const api = require("express").Router();
const { Collection } = require("discord.js");
const { join } = require("path");
let config;
try {
  //Config for testing
  config = require("../dev-config");
} catch {
  //Config for production
  config = require("../config");
}
const Auth = require("./Middlewares/Auth");
const fs = require("fs");

let CommandsDir = join(__dirname, "..", "commands");
let Commands = [];

fs.readdir(CommandsDir, (err, files) => {
  if (err) this.log(err);
  else
    files.forEach((file) => {
      let cmd = require(CommandsDir + "/" + file);
      if (!cmd.name || !cmd.description || !cmd.run) return;
      Commands.push({
        name: cmd.name,
        aliases: cmd.aliases,
        usage: cmd.usage,
        description: cmd.description,
      });
    });
});

api.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "views", "index.html"));
});

api.get("/dashboard", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views", "music.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/info", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views", "info.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/profile", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views", "profile.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/servers", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views", "servers.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/command", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views/commands", "index.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/command/:slug", Auth, (req, res) => {
  if(req.user)
    res.sendFile(join(__dirname, "..", "views/commands", "slug.html"));
  else
    res.redirect('/api/auth/discord');
});

api.get("/server/:id", Auth, (req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id))
    return res.redirect("/dashboard");
  res.sendFile(join(__dirname, "..", "views", "music.html"));
});

api.get("/server/:id/music", Auth, (req, res) => {
  if (!req.user.guilds.find((x) => x.id == req.params.id))
    return res.redirect("/dashboard");
  res.sendFile(join(__dirname, "..", "views", "music.html"));
});

api.get("/api/info", (req, res) => {
  res.send({
    ClientID: config.ClientID,
    Permissions: config.Permissions,
    Scopes: config.Scopes,
    Website: config.Website,
    CallbackURL: config.CallbackURL,
  });
});

api.get("/api/commands", (req, res) => {
  res.send({ commands: Commands });
});

api.get("/logout", (req, res) => {
  if (req.user) req.logout();
  res.redirect("/");
});

module.exports = api;
