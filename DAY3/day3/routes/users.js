var express = require('express');
const UserModel = require("../models/userSchema");
const userSchema = require('../models/userSchema');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const name = req.query.name;
  const query = {}
  if (name) {
    query.name = { $regex: name}
  }
  const findQuery = UserModel.find(query);
  findQuery.exec().then(users => {
    res.status(200).json(users);
  }).catch(error => {
    console.error(error);
    res.status(500);
    res.send("Error fetching users");
  });
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;

  if(!id) {
    res.status(400).send("You need to send an ID first !");
  }

  userSchema.findById(id).then(user => {
    if (!user) {
      res.status(404);
      res.send("User not found !");
    }
    res.status(200);
    res.json(user);
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.post("/", function(req, res, next) {
  const { name, email, INE, password } = req.body;

  UserModel.create({
    name,
    email,
    INE,
    password
  }).then(user => {
    res.status(201).json(user);
    res.send();
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.put("/:id", function(req, res, next) {
  const { name, email, INE, password } = req.body;
  const id = req.params.id;

  if(!id) {
    res.status(400).send("You need to send an ID first !");
  }

  const update = UserModel.updateOne({ _id: id }, { name, email, INE, password }, { ignoreUndefined: true });
  update.exec().then(user => {
    res.status(200).json(user);
    res.send();
  }).catch(error => {
    res.status(400).send(error);
  });
})

router.delete("/:id", function(req, res, next) {
  const id = req.params.id;

  if(!id) {
    res.status(400).send("You need to send an ID first !");
  }

  UserModel.deleteOne({ _id: id }).then(() => {
    res.status(204).send();
  }).catch(error => {
    console.error(error);
    res.status(404);
    res.send("Error deleting user !");
  });
})

module.exports = router;
