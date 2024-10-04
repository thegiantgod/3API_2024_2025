var express = require('express');
var router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // #swagger.tags = ['Users']
  const user = {
    "email": "johndoe@api.fr",
    "name": "Doe",
    "firstname": "John"
  }
  res.status(200);
  res.json(user);
});

router.post('/', isAuthenticated, function(req, res, next) {
  // #swagger.tags = ['Users']
  const data = req.body;

  const newUser = {
    email: data.email,
    name: data.name,
    firstname: data.firstname
  }

  res.status(201);
  res.json(newUser);
})

router.delete('/:id', isAuthenticated, function(req, res) {
  // #swagger.tags = ['Users']
  const id = req.params.id;
  const name = req.query.name;
  console.log(req.headers);
  console.log(id, name);
  res.status(204);
  res.send();
})

module.exports = router;
