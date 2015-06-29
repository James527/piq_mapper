var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PiqMapper' });
  // res.send({
  // 	users: ['James', 'Zach']
  // });
});

module.exports = router;
