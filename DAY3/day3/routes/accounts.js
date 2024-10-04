var express = require('express');
const AccountModel = require("../models/accountSchema");
var router = express.Router();

router.get('/', function(req, res, next) {

  
  const findQuery = AccountModel.find();
  findQuery.exec().then(users => {
    res.status(200).json(users);
  }).catch(error => {
    console.error(error);
    res.status(500);
    res.send("Error fetching accounts");
  });
});

router.get("/:id", function(req, res, next) {
  const id = req.params.id;

  if(!id) {
    res.status(400).send("You need to send an ID first !");
  }

  AccountModel.findById(id).then(account => {
    if (!account) {
      res.status(404);
      res.send("Account not found !");
    }
    res.status(200);
    res.json(account);
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.post("/", function(req, res, next) {
  const { RIB, type, ownerId } = req.body;

  AccountModel.create({
    RIB,
    type,
    balance: 0.0,
    ownerId
  }).then(account => {
    res.status(201).json(account);
    res.send();
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.put("/:id", function(req, res, next) {
    const { RIB, type, ownerId } = req.body;
    const id = req.params.id;

    if(!id) {
        res.status(400).send("You need to send an ID first !");
    }

    const update = AccountModel.updateOne({ _id: id }, { RIB, type, ownerId }, { ignoreUndefined: true });
    update.exec().then(account => {
        res.status(200).json(account);
        res.send();
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.delete("/:id", function(req, res, next) {
    const id = req.params.id;

    if(!id) {
        res.status(400).send("You need to send an ID first !");
    }

    AccountModel.deleteOne({ _id: id }).then(() => {
    res.status(204).send();
    }).catch(error => {
        console.error(error);
        res.status(404);
        res.send("Error deleting account !");
    });
});


module.exports = router;
