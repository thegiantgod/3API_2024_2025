var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/test", function(req, res, next) {
  const name = req.query.name;
  if (!name) {
    res.status(400).json("Send name first");
  }
  res.status(200).json(name);
})

module.exports = router;
