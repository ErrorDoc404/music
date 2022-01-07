const api = require("express").Router();
const Module = require("../database/schemas/Module");

api.get('/', async (req, res) => {
  try{
    const findUser = await Module.find();
    if(findUser){
      res.send(findUser);
    } else {
      res.send('user not found');
    }
  }catch (err){
    res.send(err);
  }
});

module.exports = api;
