const { Permissions } = require("discord.js");
const client = require("../../index");
const api = require("express").Router();

api.get('/:id', async (req, res ) => {
  var id = req.params.id;
  var slug = client.commands.get(id)
  res.send(slug);
});

module.exports = api;
